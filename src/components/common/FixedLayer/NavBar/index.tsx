import React from 'react';
import Image from 'next/image';
import s from './navbar.module.scss';
import { motion } from 'framer-motion';
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

const NavBar = (props: { collections: any[] }) => {
  const { openNavMenu, openModal, openSearchModal } = useUI();
  const { darkNavBar } = useAppContext();

  return (
    <nav className={clsx([s.container, darkNavBar && s.darken])}>
      <motion.div className={s.wrapper}>
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
