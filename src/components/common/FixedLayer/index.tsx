import React, { useEffect, useState } from 'react';
import s from './fixed.module.scss';
import NavBar from '@fixedLayer/NavBar';
import ScrollTopBottle from '@fixedLayer/ScrollTopBottle';
import SecondaryNavBar from '@fixedLayer/SecondaryNavBar';
import { debounce, Slide } from '@mui/material';
import NavMenu from '@fixedLayer/NavMenu';
import { useUI } from '@/context/ui/context';
import RegistrationModal from '@fixedLayer/RegistrationModal';
import { AnimatePresence } from 'framer-motion';
import { Collection } from '@/schema';
import AppToolTip from '@fixedLayer/AppToolTip';
import { useAppContext } from '@/context/app';
import { useLocomotiveScroll } from '@/context/LocoMotive';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const { navBar } = useAppContext();

  const [trigger, setTrigger] = useState(true);

  const { scrollDirection } = useLocomotiveScroll();

  useEffect(() => {
    const debouncedResponse = debounce((dir) => {
      if (!dir) return;

      if (dir === 'up') setTrigger(true);
      else if (dir === 'down') setTrigger(false);
    }, 300);
    scrollDirection.onChange(debouncedResponse);
    return () => scrollDirection.clearListeners();
  }, []);

  useEffect(() => {
    setTrigger(true);
  }, [navBar]);

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

const FixedLayer = ({ collections }: any) => {
  const { navMenu, displayModal } = useUI();

  return (
    <div className={s.container}>
      <HideOnScroll>
        <div style={{ pointerEvents: 'auto' }}>
          <NavBar />
          <SecondaryNavBar collections={collections as Collection[]} />
        </div>
      </HideOnScroll>

      <AnimatePresence exitBeforeEnter>{navMenu && <NavMenu />}</AnimatePresence>
      <AnimatePresence exitBeforeEnter>{displayModal && <RegistrationModal />}</AnimatePresence>

      <ScrollTopBottle />

      <AppToolTip />
    </div>
  );
};

export default FixedLayer;
