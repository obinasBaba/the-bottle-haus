import React from 'react';
import Image from 'next/image';
import s from './navbar.module.scss';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import CartButton from '@fixedLayer/NavBar/components/CartButton';
import { useUI } from '@/context/ui/context';
import { Button, IconButton } from '@mui/material';
import { AccountCircleTwoTone, NotesTwoTone, Search } from '@mui/icons-material';

import Logo from '@/public/logo-3.png';
import { useAppContext } from '@/context/app';
import clsx from 'clsx';
import SecondaryNavBar from '@fixedLayer/SecondaryNavBar';
import { Collection } from '@/schema';
import { MotionChild, PageTransitionContainer } from '@/components/common/MotionItems';
import { pageTransition } from '@/scenes/Homepage';

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

const NavBar = (props: { collections: any[] }) => {
  const { openNavMenu, openModal, openSearchModal } = useUI();
  const { darkNavBar } = useAppContext();

  return (
    <PageTransitionContainer variants={{}}>
      <motion.nav className={clsx([s.container, darkNavBar && s.darken])}>
        <motion.div className={s.wrapper} variants={wrapperVariants}>
          <MotionChild className={s.logo}>
            <Link href="/">
              <a>
                <Image src={Logo} alt="app-logo" objectFit="cover" />
              </a>
            </Link>
          </MotionChild>

          <div className={s.collection_links}>
            <SecondaryNavBar collections={props.collections as Collection[]} />
          </div>

          <MotionChild className={s.icons}>
            <Button
              className={s.login}
              onClick={() => openModal()}
              color="inherit"
              startIcon={<AccountCircleTwoTone />}>
              Login
            </Button>

            <CartButton />

            <IconButton color="inherit" className={s.search} onClick={() => openSearchModal()}>
              <Search />
            </IconButton>

            <IconButton onClick={() => openNavMenu()} color="inherit">
              <NotesTwoTone />
            </IconButton>
          </MotionChild>
        </motion.div>

        {/*<SecondaryNavBar collections={props.collections as Collection[]} />*/}
      </motion.nav>
    </PageTransitionContainer>
  );
};

export default NavBar;
