'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import s from './navbar.module.scss';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import CartButton from '@fixedLayer/NavBar/components/CartButton';
import { useUI } from '@/context/ui/context';
import { Button, debounce, IconButton, Slide } from '@mui/material';
import { AccountCircleTwoTone, NotesTwoTone, Search } from '@mui/icons-material';

import Logo from '@/public/logo-3.png';
import { useAppContext } from '@/context/app';
import clsx from 'clsx';
import { MotionChild, PageTransitionContainer } from '@/components/common/MotionItems';
import { pageTransition } from '@/scenes/Homepage';
import { useRouter } from 'next/navigation';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { useAppInfo } from '@/context/MotionValuesContext';
import RouteChangeEvent from '@/util/helpers/RouteChangeEvent';

const wrapperVariants: Variants = {
  animate: {
    transition: {
      delayChildren: 1, // staggerChildren: .2,
    },
  },
  exit: {
    transition: {
      // staggerChildren: 0.27,
    },
  },
};

const containerVariants: Variants = {
  initial: {
    opacity: 0,
    y: '-100%',
  },

  animate: {
    opacity: 1,
    y: '0',
    transition: {
      when: 'beforeChildren',
      ...pageTransition,
    },
  },

  exit: {
    opacity: 0,
  },
};

type Props = {
  LinkItems: React.ReactNode;
  CartButton: React.ReactNode;
}

function HideOnScroll(props: any) {
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

const NavBar = ({ LinkItems, CartButton }: Props) => {
  const { openNavMenu, openModal, openSearchModal } = useUI();
  const { darkNavBar } = useAppContext();

  return (
    <HideOnScroll>
      <div style={{ pointerEvents: 'auto' }}>
        <PageTransitionContainer variants={{}}>
          <motion.nav className={clsx([s.container, darkNavBar && s.darken])}>
            <motion.div className={s.wrapper} variants={wrapperVariants}>
              <MotionChild className={s.logo}>
                <Link href="/">
                  <Image src={Logo} alt="app-logo" objectFit="cover" />
                </Link>
              </MotionChild>

              <div className={s.collection_links}>{LinkItems}</div>

              <MotionChild className={s.icons}>
                <Button
                  className={s.login}
                  onClick={() => openModal()}
                  color="inherit"
                  startIcon={<AccountCircleTwoTone />}>
                  Login
                </Button>

                {
                  CartButton
                }

                <IconButton color="inherit" className={s.search} onClick={() => openSearchModal()}>
                  <Search />
                </IconButton>

                <IconButton onClick={() => openNavMenu()} color="inherit">
                  <NotesTwoTone />
                </IconButton>
              </MotionChild>
            </motion.div>

          </motion.nav>
        </PageTransitionContainer>
      </div>
    </HideOnScroll>
  );
};

export default NavBar;
