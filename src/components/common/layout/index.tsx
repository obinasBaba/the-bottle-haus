import React, { useEffect } from 'react';
import s from './layout.module.scss';
import { getCommerceProvider } from '@/context/SWRHookContext';
import FixedLayer from '@fixedLayer/index';
import Footer from '@/components/common/Footer';
import cs from 'clsx';
import CollectionSideNav from '@/components/common/CollectionSideNav';

interface Props {
  children: React.ReactNode;
  pageProps: {
    sideNav?: boolean;
    category?: any;
  };
}

const CommerceProvider = getCommerceProvider();

const Layout: React.FC<Props> = ({ children, pageProps }) => {
  useEffect(() => {
    console.log('pageProps : ', pageProps);
  }, [pageProps]);

  return (
    <CommerceProvider>
      <div className={s.root}>
        <FixedLayer />
        <main className={cs([s.main, { [s.with_sidenav]: pageProps.sideNav }])}>
          {pageProps.sideNav && <CollectionSideNav />}

          <div className="main_content_wrapper">{children}</div>
        </main>
        <Footer />
      </div>
    </CommerceProvider>
  );
};

export default Layout;
