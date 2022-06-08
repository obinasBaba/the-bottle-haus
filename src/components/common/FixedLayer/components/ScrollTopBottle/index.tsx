import React from 'react';
import s from './scrolltop.module.scss';
import Bottle from '@/public/scroll-top.png';
import Image from 'next/image';

const ScrollTopBottle = () => {
  return (
    <div className={s.container}>
      <div className="bottle_wrapper">
        <Image src={Bottle} alt="scroll-to-top image" />
      </div>
    </div>
  );
};

export default ScrollTopBottle;
