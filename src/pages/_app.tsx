import React, { useCallback, useEffect, useRef } from 'react';
import { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import ContextWrapper from '@/context';
import { useAppInfo } from '@/context/MotionValuesContext';
import RouteChangeEvent from '@/util/helpers/RouteChangeEvent';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { AnimatePresence } from 'framer-motion';

import '@global/index.scss';
import 'mouse-follower/src/scss/index.scss';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

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

  const ComponentOrDefaultLayout = Component.Layout || DefaultLayout;
  const transitionCallback = useTransitionFix();

  return (
    <>
      {!Component.withLayout ? (
        <AnimatePresence
          mode="wait"
          custom={{ one: '' }}
          onExitComplete={() => {
            transitionCallback();
            cursor.current?.removeText();
            cursor.current?.removeState('-opaque');
            cursor.current?.removeState('-pointer');
            // document.body.querySelector('.mf-cursor')?.classList.remove('.')

            scroll?.scrollTo(0, { duration: 0, disableLerp: true });
          }}>
          <ComponentOrDefaultLayout {...pageProps} key={pathname}>
            <Component {...pageProps} />
          </ComponentOrDefaultLayout>
        </AnimatePresence>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

interface MyAppProps extends AppProps {
  session?: Session;
  pageProps: any;
  Component: AppProps['Component'] & {
    Layout: React.FC<{ children: React.ReactNode }>;
    signIn: boolean;
  };
}

export default function MyApp({ Component, pageProps, session }: MyAppProps) {
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

  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ContextWrapper>
        <SwappingChild Component={Component} pageProps={pageProps} />
      </ContextWrapper>
    </SessionProvider>
  );
}
