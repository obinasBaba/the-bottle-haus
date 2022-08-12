import React from 'react';
import Image from 'next/image';
import s from './navbar.module.scss';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import Link from 'next/link';
import CartButton from '@fixedLayer/NavBar/components/CartButton';
import { useUI } from '@/context/ui/context';
import { Button, IconButton } from '@mui/material';
import { AccountCircleTwoTone, NotesTwoTone, Search } from '@mui/icons-material';

import Logo from '@/public/logo-2.png';
import { useAppContext } from '@/context/app';
import clsx from 'clsx';
import SecondaryNavBar from '@fixedLayer/SecondaryNavBar';
import { Collection } from '@/schema';

const NavBar = (props: { collections: any[] }) => {
  const { openNavMenu, openModal, openSearchModal } = useUI();
  const { darkNavBar } = useAppContext();
  const { scrollY } = useViewportScroll();
  const paddingValue = useMotionValue(0);
  const scale = useMotionValue(1);

  useTransform(scrollY, (input) => {
    if (input >= 50) {
      paddingValue.set(0.5);
      scale.set(1);
      return;
    } else {
      scale.set(1.2);
      paddingValue.set(1.5);
      return;
    }
  });

  const padding = useMotionTemplate`${paddingValue}rem 0`;

  return (
    <nav className={clsx([s.container, darkNavBar && s.darken])}>
      <motion.div className={s.wrapper} style={{ padding }}>
        <div className={s.logo}>
          <Link href="/">
            <a>
              <Image src={Logo} alt="app-logo" objectFit="cover" />
            </a>
          </Link>
        </div>

        <div className={s.icons}>
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
        </div>
      </motion.div>

      <SecondaryNavBar collections={props.collections as Collection[]} />
    </nav>
  );
};

export default NavBar;
