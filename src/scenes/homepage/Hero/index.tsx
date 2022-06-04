import React from 'react';
import s from './hero.module.scss';
import Image from 'next/image';
import Img from '@/public/hero.png';
import Slider from '@/public/hero-slider.png';

const Hero = () => {
  return (
    <div className={s.container}>
      <div className="gallery">
        <Image src={Img} objectFit="cover" layout={'fill'} />

        <div className={s.controller}>
          <h1 className="shop-now">Shop Now</h1>

          <div className="slider">
            <span>01</span>
            <Image src={Slider} layout={'fixed'} />
            <span>04</span>
          </div>

          <div className="buttons">
            <button className="btn"></button>
            <button className="btn"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
