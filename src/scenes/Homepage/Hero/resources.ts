import { Transition, Variants } from 'framer-motion';
import Img from '@/public/hero-slider/img_11.png';
import Img2 from '@/public/hero-slider/img_12.png';
import Img4 from '@/public/hero-slider/img_7.png';

export const images = [
  {
    img: Img,
    text: {
      title: '<span>A COLD</span> DELIGHT',
      subtitle: 'Grab Chilled',
      desc: 'Let your emotions come out with whiskey in your hand, The taste makes you feel awesome',
    },
  },
  {
    img: Img2,
    text: {
      title: 'COCKTAIL  <span style="color: #f66628" >GIFT SETS</span>',
      subtitle: 'Exclusive Offer',
      desc: '50% off all wine cocktail sets',
    },
  },
  {
    img: Img4,
    text: {
      title: '<span style="color: #fff; !important;">AUTHENTIC</span> TASTE',
      subtitle: 'Timeless flavor',
      desc: 'Let your emotions come out with whiskey in your hand, The taste makes you feel awesome',
    },
  },
];
export const containerVariants: Variants = {
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
export const imageVariants = {
  animate: {
    scale: 1.1,
    transition: {
      delay: 1,
      duration: 7,
      ease: [0.6, 0.01, 0, 0.9],
    },
  },
};
export const textContainerVariants: Variants = {
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
export const textItemVariants = {
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
export const textTransition = {
  duration: 2,
  ease: [0.6, 0.01, 0, 0.9],
};
export const transition: Transition = {
  duration: 1,
  ease: 'easeInOut',
};
