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
import { AccountCircleTwoTone, NotesTwoTone } from '@mui/icons-material';

import Logo from '@/public/logo.png';

const NavBar: React.FC = ({}) => {
  const { openNavMenu, openModal } = useUI();

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
    <nav className={s.container}>
      <motion.div className={'wrapper'} style={{ padding }}>
        <div className="logo">
          <Link href="/">
            <a>
              <Image src={Logo} alt="app-logo" objectFit="cover" />
            </a>
          </Link>
        </div>

        <div className="icons">
          <Button
            className="login"
            onClick={() => openModal()}
            color="inherit"
            startIcon={<AccountCircleTwoTone />}>
            Login
          </Button>

          <CartButton />

          <IconButton>
            <Image
              src="/search.png"
              width="15px"
              height="15px"
              alt="search-icon"
              layout="fixed"
              objectFit="contain"
            />
          </IconButton>

          <IconButton onClick={() => openNavMenu()} color="inherit">
            <NotesTwoTone />
          </IconButton>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavBar;
