import React, { useEffect, useState } from 'react';
import s from './hero.module.scss';
import Image from 'next/image';
import Img from '@/public/hero-slider/hero.png';
import Img4 from '@/public/hero-slider/img.png';
import Img2 from '@/public/hero-slider/img_2.png';
import Img3 from '@/public/hero-slider/img_1.png';
import Slider from '@/public/hero-slider.png';
import { MotionParent } from '@/components/common/MotionItems';
import { AnimatePresence } from 'framer-motion';
import { IconButton } from '@mui/material';
import { KeyboardArrowLeftTwoTone, KeyboardArrowRightTwoTone } from '@mui/icons-material';

const images = [Img, Img2, Img3, Img4];

const transition = {
  duration: 0.5,
  ease: [1, 0, 0.68, 1],
};

const Hero = () => {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const [idx, setIdx] = useState(0);

  function next() {
    const nxtIdx = idx + 1 <= images.length - 1 ? idx + 1 : 0;
    console.log('next: ', nxtIdx);
    setSelectedImg(images[nxtIdx]);
    setIdx(nxtIdx);
  }

  function prev() {
    const prvIdx = idx - 1 >= 0 ? idx - 1 : images.length - 1;
    setSelectedImg(images[prvIdx]);
    setIdx(prvIdx);
  }

  useEffect(() => {
    return;
    const intervalId = setInterval(() => {
      console.log('calling: next: ', idx);
      next();
    }, 4000);

    return () => {
      console.log('clearing: ---', intervalId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={s.container}>
      <div className="gallery">
        <AnimatePresence>
          <MotionParent key={selectedImg.src} transition={transition}>
            <Image src={selectedImg} objectFit="cover" layout={'fill'} />
          </MotionParent>
        </AnimatePresence>

        <div className={s.controller}>
          <h1 className="shop-now">Shop Now</h1>

          <div className="slider">
            <span>0{idx + 1}</span>
            <Image src={Slider} layout={'fixed'} />
            <span>04</span>
          </div>

          <div className="buttons">
            <IconButton className="btn" onClick={() => prev()}>
              <KeyboardArrowLeftTwoTone sx={{ color: 'white' }} />
            </IconButton>
            <IconButton className="btn" onClick={() => next()}>
              <KeyboardArrowRightTwoTone sx={{ color: 'white' }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
