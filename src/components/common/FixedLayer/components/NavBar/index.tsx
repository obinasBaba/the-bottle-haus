import React, { useState } from 'react';
import Image from 'next/image';
import s from './navbar.module.scss';
import { Slide, useScrollTrigger } from '@mui/material';

type NavBarProps = Record<string, unknown>;

const NavBar: React.FC = ({}) => {
  const [logoWidth, setLogoWidth] = useState('150px');

  return (
    <nav className={s.container}>
      <div className={s.wrapper}>
        <div className={`${s.menu} toggle-button`}>
          <Image
            src="/menu-btn.png"
            alt="menu-toggle-button"
            layout="fixed"
            width={'22px'}
            height="9px"
            objectFit="contain"
          />
        </div>

        <div className={s.logo}>
          <Image
            src="/logo.png"
            alt="app-logo"
            width={logoWidth}
            height="100%"
            objectFit="contain"
          />
        </div>

        <div className={s.others}>
          <div className="account">
            <div className="login">Login</div>
            <div className="create"> Create account</div>
          </div>

          <div className="icons">
            <div className="search search-icon">
              <Image
                src="/search.png"
                width={'15px'}
                height={'15px'}
                alt="search-icon"
                layout="fixed"
                objectFit="contain"
              />
            </div>

            <div className="cart">
              <div className="cart-icon">
                <Image
                  src="/cart.png"
                  alt="cart-icon"
                  layout="fixed"
                  width={'15px'}
                  height={'15px'}
                  objectFit="contain"
                />
              </div>
              <span className="cart-count">0.020$</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
