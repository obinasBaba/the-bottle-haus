import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './layout.module.scss';
import FixedLayer from '@fixedLayer/index';
import Footer from '@/components/common/Footer';
import cs from 'clsx';
import { Collection } from '@/schema';
import { useRouter } from 'next/router';
import { LocomotiveScrollProvider } from '@/context/LocoMotive';
import LocomotiveScroll from 'locomotive-scroll';
import MouseFollower from 'mouse-follower';
import gsap from 'gsap';

MouseFollower.registerGSAP(gsap);

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
  const { asPath, pathname } = useRouter();
  const [sideBar, setSideBar] = useState(false);

  useEffect(() => {
    const cursor = new MouseFollower({
      stickDelta: 12,
     /* stateDetection: {
        '-pointer': 'a,button',
        '-opaque': '.my-image',
      }*/
    });

    cursor.on('opaque', () => {
      console.log('events -- args : ');
    })

    console.log( 'ecursor events: ', cursor.events, cursor);

    return () => {
      cursor.destroy()
    };
  }, []);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        getDirection: true,
        getSpeed: true,
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
  );
};

export default Layout;
