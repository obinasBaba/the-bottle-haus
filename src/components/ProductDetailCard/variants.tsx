import { Variants } from 'framer-motion';
import { Product } from "@/types/product";
import Bottle from "@/public/whisky-review/kiss.png";

export const returnButtonVariants = {
  initial: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  hover: {
    scale: 1.5,
    opacity: [null, 1, 0, 0, 1],
    x: [null, '-100%', '-100%', '100%', '0%'],
  },

  transition: {
    duration: 0.5,
    ease: [0.6, 0.01, 0, 0.9],
    times: [0, 0.45, 0.45, 0.5, 1],
  },
};
export const imgVariants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0.9,
    opacity: 0,
  },
};
export const signVariants = {
  initial: {
    x: '-100%',
  },
  animate: {
    x: '0%',
  },
};
export const detailTxtBackgroundVariant: any = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
  },
  exit: {
    // opacity: 0,
  },

  transition: {
    duration: 1,
    ease: [0.6, 0.01, 0, 0.9],
    delay: 0.2,
  },
};
export const titleContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      delay: 0.8,
      staggerChildren: 0.08,
    },
  },
};
export const detailTxtWrapper: Variants = {
  animate: {
    transition: {
      delayChildren: 0.9,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
};
export const titleWordVariants = {
  initial: {
    y: '100%',
  },
  animate(custom: any) {
    return {
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.6, 0.01, 0, 0.9], // delay: 0.04 * custom.idx,
      },
    };
  },
  exit: {
    // opacity: 0,
  },
};
const detailTxtVariants = {};

const dummyProduct: Product = {
  id: '78asdf',
  options: [],
  variants: [],
  images: [{ url: Bottle.src }],
  name: 'Buffalo Trace Bourbon Cream Liqueur',
  price: {
    value: 99.44,
    discount: 10,
  },
  description:
    'Situated on the Kentucky River in Frankfort, Kentucky, Buffalo Trace Distillery takes its name from an ancient pathway that migrating buffalo used when traveling westward. The trail was well-known among Native Americans and was eventually used by pioneering settlers who crossed the Ohio River and followed the buffalo trace to the Western frontier.Buffalo Trace Distillery is the oldest continually operating distillery in the United States and includes the rich legacies of master distillers such as E.H. Taylor, Jr, George T. Stagg, Albert B. Blanton, Orville Schupp, and Elmer T. Lee.l',
};
