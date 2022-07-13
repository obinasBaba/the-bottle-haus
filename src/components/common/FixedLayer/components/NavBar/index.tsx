import React, { useState } from 'react';
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

type NavBarProps = Record<string, unknown>;

const NavBar: React.FC = ({}) => {
  const { openNavMenu } = useUI();

  const { scrollY } = useViewportScroll();
  const padding1 = useMotionValue(0);
  useTransform(scrollY, (input) => {
    if (input >= 50) return padding1.set(1);
    else return padding1.set(2);
  });

  const padding = useMotionTemplate`${padding1}rem 0`;

  return (
    <nav className={s.container}>
      <motion.div className={s.wrapper} style={{ padding }}>
        <div className={s.logo}>
          <Link href="/">
            <a>
              <Image src="/logo.png" alt="app-logo" objectFit="contain" layout="fill" />
            </a>
          </Link>
        </div>

        <div className={s.others}>
          <div className="account">
            <div className="login">Login</div>
            <div className="create"> Create Account</div>
          </div>

          <div className="icons">
            <button className="search search-icon">
              <Image
                src="/search.png"
                width="15px"
                height="15px"
                alt="search-icon"
                layout="fixed"
                objectFit="contain"
              />
            </button>

            <CartButton />

            <button className="menu toggle-button" onClick={() => openNavMenu()}>
              <Image
                src="/menu-btn.png"
                alt="menu-toggle-button"
                layout="fixed"
                width="22px"
                height="9px"
                objectFit="contain"
              />
            </button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavBar;
