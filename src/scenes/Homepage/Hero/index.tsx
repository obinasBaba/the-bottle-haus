import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Img from '@/public/hero-slider/img_8.png'; // todo -- change
import Img4 from '@/public/hero-slider/img_7.png';
import Img2 from '@/public/hero-slider/img_3.png';
import Img3 from '@/public/hero-slider/img_4.png';
import { MotionParent } from '@/components/common/MotionItems';
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { IconButton } from '@mui/material';
import { KeyboardArrowLeftTwoTone, KeyboardArrowRightTwoTone } from '@mui/icons-material';
import s from './hero.module.scss';
import clsx from 'clsx';

const images = [Img, Img2, Img3, Img4];

const variants: Variants = {
  initial: {
    filter: 'grayscale(100%) sepia(20%) brightness(80%)',
    // scale: 0.65,
    opacity: 0.7,
    zIndex: 0,
  },
  animate: {
    filter: 'grayscale(0%) sepia(0%) brightness(100%)',
    scale: 1,
    opacity: 1,
    transitionEnd: {
      zIndex: 1,
    },

    transition: {
      filter: {
        delay: 0.5,
        duration: 1.3,
        ease: [0.6, 0.01, 0, 0.9],
      },
      duration: 1.3,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },

  exit: {
    opacity: 0,
    scale: 1.2,
    // x: '100%',
  },
};

const transition: Transition = {
  duration: 1,
  ease: 'easeInOut',
};

let touched = false;

const Hero = () => {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const [idx, setIdx] = useState(0);
  const savedCallback = useRef<any>();

  function next() {
    const nxtIdx = idx + 1 <= images.length - 1 ? idx + 1 : 0;
    setSelectedImg(images[nxtIdx]);
    setIdx(nxtIdx);
  }

  function prev() {
    const prvIdx = idx - 1 >= 0 ? idx - 1 : images.length - 1;
    setSelectedImg(images[prvIdx]);
    setIdx(prvIdx);
  }

  useEffect(() => {
    // console.log('inc changed: --');
    savedCallback.current = next;
  });

  useEffect(() => {
    function tick() {
      if (!touched) savedCallback.current();
      touched = false;
    }

    const interval = setInterval(tick, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.gallery}>
        <AnimatePresence>
          <MotionParent
            key={selectedImg.src}
            variants={variants}
            transition={transition}
            className={s.slider}>
            <motion.div
              className={clsx([s.img_wrapper])}
              variants={{
                animate: {
                  scale: 2,
                  transition: {
                    delay: 0.5,
                    duration: 100,
                    ease: 'linear',
                  },
                },
              }}>
              <Image src={selectedImg} objectFit="cover" layout="fill" alt="hero slider image" />
            </motion.div>
          </MotionParent>
        </AnimatePresence>

        <div className={s.controller}>
          <div className={s.buttons}>
            <IconButton
              onClick={() => {
                touched = true;
                prev();
              }}>
              <KeyboardArrowLeftTwoTone sx={{ color: 'white' }} />
            </IconButton>
            <IconButton
              onClick={() => {
                touched = true;
                next();
              }}>
              <KeyboardArrowRightTwoTone sx={{ color: 'white' }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
