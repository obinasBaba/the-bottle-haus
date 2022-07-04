// noinspection ES6UnusedImports

import { AppProps } from 'next/app';
import Layout from '@/components/common/layout';
import '@global/index.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import '@/public/nprogress.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: any) => {
      // console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = (url: any) => {
      // console.log(`finish loading: ${url}`);

      NProgress.done();
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
    <Layout pageProps={pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
