import React, { useEffect, useState } from 'react';
import NavBar from '@fixedLayer/NavBar';
import ScrollTopBottle from '@fixedLayer/ScrollTopBottle';
import SecondaryNavBar from '@fixedLayer/SecondaryNavBar';
import { debounce, Slide } from '@mui/material';
import NavMenu from '@fixedLayer/NavMenu';
import { useUI } from '@/context/ui/context';
import RegistrationModal from '@fixedLayer/RegistrationModal';
import { AnimatePresence, useTransform } from 'framer-motion';
import { Collection } from '@/schema';
import AppToolTip from '@fixedLayer/AppToolTip';
import { useAppContext } from '@/context/app';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { useRouter } from 'next/router';
import s from './fixed.module.scss';
import SearchModal from '@fixedLayer/SearchModal';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const { navBar } = useAppContext();
  const router = useRouter();

  const [trigger, setTrigger] = useState(true);

  const dd = debounce((dir) => {
    // console.log('boooo : ', dir);
    // if (dir === 'up') setTrigger(true);
    // else if (dir === 'down') setTrigger(false);
  }, 5400);
  const { scrollDirection } = useLocomotiveScroll();
  const transform = useTransform(scrollDirection, dd);

  useEffect(() => {
    transform.onChange((dir) => {
      console.log('direction: ', dir);
    });

    const debouncedResponse = debounce((dir) => {
      if (!dir) return;

      if (dir === 'up') setTrigger(true);
      else if (dir === 'down') setTrigger(false);
    }, 300);
    scrollDirection.onChange(debouncedResponse);
    return () => {
      scrollDirection.clearListeners();
      transform.clearListeners();
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
  const { navMenu, displayModal, searchModal } = useUI();

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

      <AnimatePresence exitBeforeEnter>{searchModal && <SearchModal />}</AnimatePresence>

      <ScrollTopBottle />

      <AppToolTip />
    </div>
  );
};

export default FixedLayer;
