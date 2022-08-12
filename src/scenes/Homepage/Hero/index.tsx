import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Img from '@/public/hero-slider/img_8.png'; // todo -- change
import Img4 from '@/public/hero-slider/img_7.png';
import Img2 from '@/public/hero-slider/img_3.png';
import Img3 from '@/public/hero-slider/img_4.png';
import { MotionParent } from '@/components/common/MotionItems';
import { AnimatePresence, motion, MotionConfig, Transition, Variants } from 'framer-motion';
import { Button, debounce, IconButton } from '@mui/material';
import { KeyboardArrowLeftTwoTone, KeyboardArrowRightTwoTone } from '@mui/icons-material';
import s from './hero.module.scss';
import clsx from 'clsx';
import { useAppContext } from '@/context/app';

const images = [
  {
    img: Img,
    text: {
      title: 'A COLD DELIGHT',
      subtitle: 'Grab Chilled',
      desc: 'Let your emotions come out with whiskey in your hand, The taste makes you feel awesome',
    },
  },
  {
    img: Img2,
    text: {
      title: 'SPECIAL RELEASE',
      subtitle: 'Exclusive Offer',
      desc: 'Let your emotions come out with whiskey in your hand, The taste makes you feel awesome',
    },
  },
  {
    img: Img3,
    text: {
      title: 'AUTHENTIC TASTE',
      subtitle: 'Timeless flavor',
      desc: 'Let your emotions come out with whiskey in your hand, The taste makes you feel awesome',
    },
  },
  {
    img: Img4,
    text: {
      title: 'WHISKEY PLEASURE',
      subtitle: 'Taste the Excellence',
      desc: 'All you need is a Glass. First, it needs  to be chilled, and second, it needs to be ours. You deserve to relax',
    },
  },
];

const containerVariants: Variants = {
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

const imageVariants = {
  animate: {
    scale: 2,
    transition: {
      delay: 0.5,
      duration: 100,
      ease: 'linear',
    },
  },
};

const textContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
    },
  },

  exit: {
    opacity: 0,
  },
};

const textItemVariants = {
  initial: {
    opacity: 0,
    x: '-150%',
  },

  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: [0.6, 0.01, 0, 0.9],
    },
  },
};

const textTransition = {
  duration: 2,
  ease: [0.6, 0.01, 0, 0.9],
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
    function tick() {
      if (!touched) savedCallback.current();
      touched = false;
    }

    const interval = setInterval(tick, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.container}>
      <motion.div
        className={s.gallery}
        onViewportLeave={debounce(lightenNavBar, 500)}
        onViewportEnter={debounce(darkenNavBar, 500)}>
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
            <KeyboardArrowLeftTwoTone sx={{ color: 'white' }} />
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
            <KeyboardArrowRightTwoTone sx={{ color: 'white' }} />
          </IconButton>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
