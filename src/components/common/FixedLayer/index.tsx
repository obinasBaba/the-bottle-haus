import React from 'react';
import s from './fixed.module.scss';
import NavBar from '@fixedLayer/components/NavBar';
import ScrollTopBottle from '@fixedLayer/components/ScrollTopBottle';
import SecondaryNavBar from '@fixedLayer/components/SecondaryNavBar';

const FixedLayer = () => {
  return (
    <div className={s.container}>
      <NavBar />
      <SecondaryNavBar />

      <ScrollTopBottle />
    </div>
  );
};

export default FixedLayer;
