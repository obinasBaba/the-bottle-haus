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
import CartButton from '@fixedLayer/components/NavBar/components/CartButton';
import { useUI } from '@/context/ui/context';
import { Button, IconButton } from '@mui/material';
import { AccountCircleRounded, NotesTwoTone } from '@mui/icons-material';

type NavBarProps = Record<string, unknown>;

const NavBar: React.FC = ({}) => {
  const { openNavMenu, openModal } = useUI();

  const { scrollY } = useViewportScroll();
  const padding1 = useMotionValue(0);
  useTransform(scrollY, (input) => {
    if (input >= 50) return padding1.set(1);
    else return padding1.set(2);
  });

  const padding = useMotionTemplate`${padding1}rem 0`;

  return (
    <nav className={s.container}>
      <motion.div className={'wrapper'} style={{ padding }}>
        <div className="logo">
          <Link href="/">
            <a>
              <Image src="/logo.png" alt="app-logo" objectFit="contain" layout="fill" />
            </a>
          </Link>
        </div>

        <div className="icons">
          <Button
            className="login"
            onClick={() => openModal()}
            color="inherit"
            startIcon={<AccountCircleRounded />}>
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

          <IconButton onClick={() => openNavMenu()}>
            <NotesTwoTone />
          </IconButton>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavBar;
