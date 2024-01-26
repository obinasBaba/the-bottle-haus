import s from '@/components/common/layout/layout.module.scss';
import cs from 'clsx';
import Footer from '@/components/common/Footer';
import FixedLayer from '@fixedLayer/index';
import { AnimatePresenceCb } from '@/components/ui/framer-motion/animate-presence';
import { LocomotiveScrollProvider } from '@/context/LocoMotive';

const Layout = ({ children }: any) => {
  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        getDirection: true,
        getSpeed: true,
        // smoothMobile: true,
      }}
      watch={[]}>
      <div className={s.root} data-scroll-container={true}>
        <FixedLayer />

        <main className={cs([s.main])} data-scroll-section={true} id="main-container">
          {children}
        </main>
        <Footer />
      </div>
    </LocomotiveScrollProvider>
  );
};

const PageWrapper = ({ children }: any) => {
  return (
    <Layout>
      <AnimatePresenceCb>{children}</AnimatePresenceCb>
    </Layout>
  );
};

export default PageWrapper;
