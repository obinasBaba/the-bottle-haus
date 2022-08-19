import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MotionParent } from '@/components/common/MotionItems';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Button, debounce, IconButton } from '@mui/material';
import { KeyboardArrowLeftTwoTone, KeyboardArrowRightTwoTone } from '@mui/icons-material';
import s from './hero.module.scss';
import clsx from 'clsx';
import { useAppContext } from '@/context/app';
import {
  containerVariants,
  images,
  imageVariants,
  textContainerVariants,
  textItemVariants,
  textTransition,
  transition,
} from '@/scenes/Homepage/Hero/resources';

let touched = false;

const Hero = () => {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const [idx, setIdx] = useState(0);
  const savedCallback = useRef<any>();
  const { darkenNavBar, lightenNavBar } = useAppContext();

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
    savedCallback.current = next;
  });

  useEffect(() => {
    return;
    function tick() {
      if (!touched) savedCallback.current();
      touched = false;
    }

    const interval = setInterval(tick, 7000);

    return () => {
      clearInterval(interval);
      // lightenNavBar();
    };
  }, []);

  useLayoutEffect(() => {
    return () => {
      // darkenNavBar();
    };
  }, []);

  return (
    <div className={s.container}>
      <motion.div
        className={s.gallery}
        // onViewportLeave={debounce(lightenNavBar, 500)}
        // onViewportEnter={debounce(darkenNavBar, 500)}
      >
        <AnimatePresence>
          <MotionParent
            key={selectedImg.img.src}
            variants={containerVariants}
            transition={transition}
            className={s.slider}>
            <motion.div className={clsx([s.img_wrapper])} variants={imageVariants}>
              <Image
                src={selectedImg.img}
                objectFit="cover"
                layout="fill"
                alt="hero slider image"
              />
            </motion.div>
          </MotionParent>
        </AnimatePresence>

        <div className={s.controller}>
          <IconButton
            className={s.prev}
            onClick={() => {
              touched = true;
              prev();
            }}>
            <KeyboardArrowLeftTwoTone />
          </IconButton>

          <AnimatePresence exitBeforeEnter>
            <MotionParent
              className={s.text}
              key={selectedImg.img.src}
              variants={textContainerVariants}>
              <MotionConfig transition={textTransition}>
                <motion.p variants={textItemVariants}>{selectedImg.text.subtitle}</motion.p>
                <motion.h1 variants={textItemVariants}>{selectedImg.text.title}</motion.h1>
                <motion.big variants={textItemVariants}>{selectedImg.text.desc}</motion.big>
                <motion.div variants={textItemVariants}>
                  <Button variant="contained" size="large">
                    Shop Now
                  </Button>
                </motion.div>
              </MotionConfig>
            </MotionParent>
          </AnimatePresence>

          <IconButton
            className={s.next}
            onClick={() => {
              touched = true;
              next();
            }}>
            <KeyboardArrowRightTwoTone />
          </IconButton>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
