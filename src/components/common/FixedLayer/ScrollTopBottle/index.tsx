import React, { useEffect } from 'react';
import s from './scrolltop.module.scss';
import Bottle from '@/public/scroll-top.png';
import Image from 'next/image';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { motion, useAnimationControls, useTransform } from 'framer-motion';

const bottleVariants = {
  initial: {
    opacity: 0,
    y: '100%',
  },

  show: {
    opacity: 1,
    y: '0',
  },

  hide: {
    opacity: 0,
    y: '100%',
    transition: {
      opacity: {
        delay: 0.34,
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1],
      },
      default: {
        delay: 0.34,
        duration: 1.5,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  },
};

const transition = {
  duration: 1.5,
  ease: [0.165, 0.84, 0.44, 1],
};

let show = false;
const ScrollTopBottle = () => {
  const { scroll, yProgress } = useLocomotiveScroll();
  const control = useAnimationControls();

  const hideOnScroll = useTransform(yProgress, [0, 0.2], [0, 0.2]);

  useEffect(() => {
    yProgress.onChange((y) => {
      console.log('y: ', y);
      if (y > 0.17) {
        if (show) return;
        show = true;
        control.start('show');
      } else {
        if (!show) return;
        show = false;
        control.start('hide');
      }
    });

    return () => yProgress.clearListeners();
  }, []);

  return (
    <motion.button
      initial="initial"
      animate={control}
      variants={bottleVariants}
      transition={transition}
      className={s.container}
      onClick={() => scroll?.scrollTo(0, { duration: 1.3, easing: [0.6, 0.01, 0, 0.9] })}>
      <div className="bottle_wrapper">
        <Image src={Bottle} alt="scroll-to-top image" />
      </div>
    </motion.button>
  );
};

export default ScrollTopBottle;
