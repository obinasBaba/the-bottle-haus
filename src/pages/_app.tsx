// noinspection ES6UnusedImports

import { AppProps } from 'next/app';
import Layout from '@/components/common/layout';
import '@global/index.scss';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import ContextWrapper from '@/context';
import createEmotionCache from '@/createEmotoinCache';
import theme from '@/theme';
import { useAppInfo } from '@/context/MotionValuesContext';
import RouteChangeEvent from '@/util/helpers/RouteChangeEvent';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { LocomotiveScrollProvider } from '@/context/LocoMotive';
import LocomotiveScroll from 'locomotive-scroll';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session?: Session;
  Component: AppProps['Component'] & { layout: boolean };
}

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
  session,
}: MyAppProps) {
  const router = useRouter();
  const event = RouteChangeEvent.GetInstance();

  useEffect(() => {
    const handleStart = (url: any) => {
      event.emit('start', url);
    };

    const handleStop = (url: any) => {
      event.emit('end', url);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ContextWrapper>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <title>This is a Layout</title>
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            {!Component.layout ? (
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </ThemeProvider>
        </CacheProvider>
      </ContextWrapper>
    </SessionProvider>
  );
}
