// noinspection ES6UnusedImports

import { AppProps } from 'next/app';
import Layout from '@/components/common/layout';
import '@global/index.scss';

import React, { useCallback, useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router';
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
import { LocomotiveScrollProvider, useLocomotiveScroll } from '@/context/LocoMotive';
import LocomotiveScroll from 'locomotive-scroll';
import { AnimatePresence } from 'framer-motion';
import 'mouse-follower/src/scss/index.scss';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

/*const routeChange = () => {
  // Temporary fix to avoid flash of unstyled content
  // during route transitions. Keep an eye on this
  // issue and remove this code when resolved:
  // https://github.com/vercel/next.js/issues/17464

  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]');
    allStyleElems.forEach((elem) => {
      elem.removeAttribute('media');
    });
  };
  tempFix();
};

Router.events.on('routeChangeComplete', routeChange);
Router.events.on('routeChangeStart', routeChange);*/

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session?: Session;
  Component: AppProps['Component'] & {
    Layout: React.FC<{ children: React.ReactNode }>;
    withLayout: boolean;
  };
}

// utils/useTransitionFix.ts

type Cleanup = () => void;

export const useTransitionFix = (): Cleanup => {
  const cleanupRef = useRef<Cleanup>(() => null);

  useEffect(() => {
    const changeListener = () => {
      // Create a clone of every <style> and <link> that currently affects the page. It doesn't
      // matter if Next.js is going to remove them or not since we are going to remove the copies
      // ourselves later on when the transition finishes.
      const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])');
      const copies = [...nodes].map((el) => el.cloneNode(true) as HTMLElement);

      for (const copy of copies) {
        // Remove Next.js' data attributes so the copies are not removed from the DOM in the route
        // change process.
        copy.removeAttribute('data-n-p');
        copy.removeAttribute('data-n-href');

        // Add duplicated nodes to the DOM.
        document.head.appendChild(copy);
      }

      cleanupRef.current = () => {
        for (const copy of copies) {
          // Remove previous page's styles after the transition has finalized.
          document.head.removeChild(copy);
        }
      };
    };

    Router.events.on('beforeHistoryChange', changeListener);

    return () => {
      Router.events.off('beforeHistoryChange', changeListener);
      cleanupRef.current();
    };
  }, []);

  // Return an fixed reference function that calls the internal cleanup reference.
  return useCallback(() => {
    cleanupRef.current();
  }, []);
};

function SwappingChild({ Component, pageProps }: any) {
  const { scroll, cursor } = useLocomotiveScroll();
  const { toolTipsData, scrollState } = useAppInfo();
  const { pathname } = useRouter();

  const NestedLayout = Component.Layout || DefaultLayout;
  const transitionCallback = useTransitionFix();

  return (
    <>
      {!Component.withLayout ? (
        <AnimatePresence
          exitBeforeEnter
          custom={{ one: '' }}
          onExitComplete={() => {
            // transitionCallback();
            cursor.current?.removeText();
            cursor.current?.removeState('-opaque');
            cursor.current?.removeState('-pointer');
            // document.body.querySelector('.mf-cursor')?.classList.remove('.')

            scroll?.scrollTo(0, { duration: 0, disableLerp: true });
          }}>
          <NestedLayout {...pageProps} key={pathname}>
            <Component {...pageProps} />
          </NestedLayout>
        </AnimatePresence>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
  session,
}: MyAppProps) {
  const router = useRouter();
  const { pathname } = useRouter();

  const { scroll } = useLocomotiveScroll();

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

  const NestedLayout = Component.Layout || DefaultLayout;

  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ContextWrapper>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <title>This is a Layout</title>
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Layout pageProps={pageProps}>
              <SwappingChild Component={Component} pageProps={pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </ContextWrapper>
    </SessionProvider>
  );
}
