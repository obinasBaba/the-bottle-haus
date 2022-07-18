import React from 'react';
import s from './layout.module.scss';
import FixedLayer from '@fixedLayer/index';
import Footer from '@/components/common/Footer';
import cs from 'clsx';
import CollectionSideNav from '@/components/common/CollectionSideNav';
import { Collection } from '@/schema';
import CollectionsFilter from '@/components/common/CollectionsFilter';

interface Props {
  children: React.ReactNode;
  pageProps: {
    sideNav?: boolean;
    collections: Collection[];
    collectionName: string;
  };
}

const Layout: React.FC<Props> = ({ children, pageProps }) => {
  return (
    <>
      <div className={s.root}>
        <FixedLayer collections={pageProps.collections} />
        <main className={cs([s.main, { [s.with_sidenav]: pageProps.sideNav }])}>
          {pageProps.sideNav && <CollectionSideNav collections={pageProps.collections} />}

          <div className="content_wrapper">
            {pageProps.sideNav && <CollectionsFilter title={pageProps.collectionName} />}
            <div className="main_content_wrapper">{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
