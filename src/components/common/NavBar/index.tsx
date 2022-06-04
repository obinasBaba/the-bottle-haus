import React from 'react';
import Image from 'next/image';
import s from './navbar.module.scss';

type NavBarProps = Record<string, unknown>;

const NavBar: React.FC = ({}) => {
  return (
    <nav className={s.container}>
      <div className="menu toggle-button">
        <Image src="/menu-btn.png" alt="menu-toggle-button" layout="fill" />
      </div>

      <div className={'logo'}>
        <Image src="/logo.png" alt="app-logo" layout="fill" />
      </div>

      <div className={s.others}>
        <div className="account">
          <span className="login">Login</span>
          <span className="create"> Create account </span>
        </div>

        <div className="icons">
          <div className="search">
            <Image
              src="/search.png"
              width={'15px'}
              height={'15px'}
              alt="search-icon"
              layout="fixed"
              // objectFit="contain"
            />
          </div>

          <a href="/cart" className="cart">
            <div className="cart-icon">
              <Image src="/cart.png" alt="cart-icon" layout="fill" objectFit="contain" />
            </div>
            <span className="cart-count">$2323.23</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
