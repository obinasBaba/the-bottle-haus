import React from 'react';
import s from './fixed.module.scss';
import NavBar from '@fixedLayer/NavBar';
import ScrollTopBottle from '@fixedLayer/ScrollTopBottle';
import SecondaryNavBar from '@fixedLayer/SecondaryNavBar';
import { Slide, useScrollTrigger } from '@mui/material';
import NavMenu from '@fixedLayer/NavMenu';
import { useUI } from '@/context/ui/context';
import RegistrationModal from '@fixedLayer/RegistrationModal';
import { AnimatePresence } from 'framer-motion';
import { Collection } from '@/schema';
import AppToolTip from '@fixedLayer/AppToolTip';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
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

      {displayModal && <RegistrationModal />}

      <ScrollTopBottle />

      <AppToolTip />
    </div>
  );
};

export default FixedLayer;
