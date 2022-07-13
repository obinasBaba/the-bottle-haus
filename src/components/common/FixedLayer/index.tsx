import React from 'react';
import s from './fixed.module.scss';
import NavBar from '@fixedLayer/components/NavBar';
import ScrollTopBottle from '@fixedLayer/components/ScrollTopBottle';
import SecondaryNavBar from '@fixedLayer/components/SecondaryNavBar';
import { Slide, useScrollTrigger } from '@mui/material';
import NavMenu from '@fixedLayer/components/NavMenu';
import { useUI } from '@/context/ui/context';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const FixedLayer = () => {
  const { navMenu } = useUI();

  return (
    <div className={s.container}>
      <HideOnScroll>
        <div style={{ pointerEvents: 'auto' }}>
          <NavBar />
          <SecondaryNavBar />
        </div>
      </HideOnScroll>

      {navMenu && <NavMenu />}

      <ScrollTopBottle />
    </div>
  );
};

export default FixedLayer;
