import React, { useEffect, useState } from 'react';
import NavBar from '@fixedLayer/NavBar';
import ScrollTopBottle from '@fixedLayer/ScrollTopBottle';
import { debounce, Slide } from '@mui/material';
import NavMenu from '@fixedLayer/NavMenu';
import { useUI } from '@/context/ui/context';
import RegistrationModal from '@fixedLayer/RegistrationModal';
import { AnimatePresence } from 'framer-motion';
import AppToolTip from '@fixedLayer/AppToolTip';
import { useAppContext } from '@/context/app';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { useRouter } from 'next/router';
import s from './fixed.module.scss';
import SearchModal from '@fixedLayer/SearchModal';
import LoadingModal from '@fixedLayer/LoadingModal';
import { useAppInfo } from '@/context/MotionValuesContext';

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

    scrollDirection.onChange(debouncedResponse);

    return () => {
      scrollDirection.clearListeners();
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
      <AnimatePresence exitBeforeEnter>
        {loadingModal && !currentPath.asPath.includes('sign-in') && <LoadingModal />}
      </AnimatePresence>

      <HideOnScroll>
        <div style={{ pointerEvents: 'auto' }}>
          <NavBar collections={collections} />
        </div>
      </HideOnScroll>

      <AnimatePresence exitBeforeEnter>{navMenu && <NavMenu />}</AnimatePresence>
      <AnimatePresence exitBeforeEnter>{displayModal && <RegistrationModal />}</AnimatePresence>

      <AnimatePresence exitBeforeEnter>{searchModal && <SearchModal />}</AnimatePresence>

      {/*<SubscribeEmailModal />*/}

      <ScrollTopBottle />

      <AppToolTip />
    </div>
  );
};

export default FixedLayer;
