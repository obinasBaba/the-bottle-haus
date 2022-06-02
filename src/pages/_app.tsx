import { AppProps } from 'next/app';
import '@/styles/global.css';
import Layout from '@/components/common/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout pageProps={{}}>
      <Component {...pageProps} />
    </Layout>
  );
}
