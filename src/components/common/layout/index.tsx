import React, { useCallback, useRef } from 'react';
import s from './layout.module.scss';
import FixedLayer from '@fixedLayer/index';
import Footer from '@/components/common/Footer';
import cs from 'clsx';
import CollectionSideNav from '@/components/common/CollectionScaffold/CollectionSideNav';
import { Collection } from '@/schema';
import CollectionsFilterHeader from '@/components/common/CollectionScaffold/CollectionsFilter';
import { useRouter } from 'next/router';
import { LocomotiveScrollProvider } from '@/context/LocoMotive';
import LocomotiveScroll from 'locomotive-scroll';
import { AnimatePresence } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  pageProps: {
    sideNav?: boolean;
    collections: Collection[];
    collectionName: string;
  };
}

const Layout: React.FC<Props> = ({ children, pageProps }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const { asPath } = useRouter();

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        getDirection: true,
        getSpeed: true,
      }}
      containerRef={container} // height change detection
      watch={[]}
      onLocationChange={useCallback(
        (scroll: LocomotiveScroll) =>
          scroll.scrollTo(0, {
            duration: 0,
            disableLerp: true,
          }),
        [],
      )}
      location={asPath}>
      <FixedLayer collections={pageProps.collections} />
      <div className={s.root} ref={container} data-scroll-container={true}>
        <main
          className={cs([s.main, { [s.with_sidenav]: pageProps.sideNav }])}
          data-scroll-section={true}
          id="main-container">
          <AnimatePresence exitBeforeEnter custom={{}}>
            {pageProps.sideNav && <CollectionSideNav collections={pageProps.collections} />}
          </AnimatePresence>

          <div className="content_wrapper" id="fixed-target">
            <AnimatePresence exitBeforeEnter custom={{}}>
              {pageProps.sideNav && (
                <CollectionsFilterHeader
                  title={pageProps.collectionName}
                  key={pageProps.collectionName}
                />
              )}
            </AnimatePresence>

            <div className="main_content_wrapper">
              <AnimatePresence exitBeforeEnter custom={{}}>
                {children}
              </AnimatePresence>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </LocomotiveScrollProvider>
  );
};

export default Layout;
