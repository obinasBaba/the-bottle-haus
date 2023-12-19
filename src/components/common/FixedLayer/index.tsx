import React, { useEffect, useLayoutEffect, useState } from 'react';
import { debounce, Slide } from '@mui/material';
import { useUI } from '@/context/ui/context';
import { AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/app';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { useRouter } from 'next/router';
import s from './fixed.module.scss';
import { useAppInfo } from '@/context/MotionValuesContext';
import RouteChangeEvent from '@/util/helpers/RouteChangeEvent';
import NavMenu from '@fixedLayer/NavMenu';
import RegistrationModal from '@fixedLayer/RegistrationModal';
import SearchModal from '@fixedLayer/SearchModal';
import ScrollTopBottle from '@fixedLayer/ScrollTopBottle';
import dynamic from 'next/dynamic';
// import AppToolTip from '@fixedLayer/AppToolTip';

const AppToolTip = dynamic(() => import('@fixedLayer/AppToolTip'), {
  suspense: false,
});

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const { navBar } = useAppContext();
  const router = useRouter();

  const [trigger, setTrigger] = useState(true);

  const { scrollDirection, yProgress } = useLocomotiveScroll();
  const { appBarScrollState } = useAppInfo();

  useLayoutEffect(() => {
    const event = RouteChangeEvent.GetInstance();

    event.addListener('end', () => {
      setTrigger(true);
    });
  }, []);

  useEffect(() => {
    const debouncedResponse = debounce((dir) => {
      if (!dir) return;

      // if (0.05 > yProgress.get()) return setTrigger(true);

      if (dir === 'up') {
        setTrigger(true);
        appBarScrollState.set('up');
      } else if (dir === 'down') {
        setTrigger(false);
        appBarScrollState.set('down');
      }
    }, 400);

    if (scrollDirection) {
      scrollDirection.on('change', debouncedResponse);
    }

    return () => {
      scrollDirection?.clearListeners();
    };
  }, [scrollDirection]);

  useEffect(() => {
    setTrigger(true);
  }, [navBar, router]);

  return (
    <Slide appear={false} direction="down" in={trigger} timeout={500}>
      {children}
    </Slide>
  );
}

const FixedLayer = ({ collections }: any) => {
  const { navMenu, displayModal, searchModal, loadingModal, closeLoadingModal } = useUI();
  const currentPath = useRouter();

  useEffect(() => {
    setTimeout(() => {
      // closeLoadingModal();
    }, 2000);
  }, []);

  return (
    <div className={s.container}>
      <AnimatePresence mode="wait">
        {/*{loadingModal && !currentPath.asPath.includes('sign-in') && <LoadingModal />}*/}
      </AnimatePresence>

      {/*   <HideOnScroll>
        <div style={{ pointerEvents: 'auto' }}>
          <NavBar collections={collections} />
        </div>
      </HideOnScroll>*/}

      <AnimatePresence mode="wait">{navMenu && <NavMenu />}</AnimatePresence>
      <AnimatePresence mode="wait">{displayModal && <RegistrationModal />}</AnimatePresence>

      <AnimatePresence mode="wait">{searchModal && <SearchModal />}</AnimatePresence>

      <ScrollTopBottle />

      <AppToolTip />
    </div>
  );
};

export default FixedLayer;
