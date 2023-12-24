import React, { useRef } from 'react';
import s from './layout.module.scss';
import cs from 'clsx';
import { usePathname } from 'next/navigation';
import Footer from '@/components/common/Footer';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  return (
    <>
      {/*<FixedLayer collections={pageProps.collections} />*/}
      <div className={s.root} ref={container} data-scroll-container={true}>
        <main className={cs([s.main])} data-scroll-section={true} id="main-container">

          {children}

        </main>
        <Footer />
      </div>
    </>
  );

  /* return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        getDirection: true,
        getSpeed: true /!*smoothMobile: {
          breakpoint: 0,
          smooth: true,
          getDirection: true,
        },*!/ /!*tablet: {
          breakpoint: 0,
          smooth: true,
          getDirection: true,
        },*!/,
      }}
      containerRef={container} // height change detection
      watch={[]}
      onLocationChange={useCallback((scroll: LocomotiveScroll) => null, [])}
      location={asPath}>
      <FixedLayer collections={pageProps.collections} />
      <div className={s.root} ref={container} data-scroll-container={true}>
        <main className={cs([s.main])} data-scroll-section={true} id="main-container">
          <div className="content_wrapper">
            <div className="main_content_wrapper">{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </LocomotiveScrollProvider>
  ); */
};

export default Layout;
