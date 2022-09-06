import { Variants } from 'framer-motion';
import { pageTransition } from '@/scenes/Homepage';

export const swappingFormVariants = {
  initial: {
    opacity: 0,
    scale: 0.87,
    y: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0, // scale: 0.92,
  },
};

export const boxContainerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.27,
    },
  },
};

export const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0.87,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.92,
  },
};

// fixing layout transition
export const activeFormVariants = {
  initial: {
    opacity: 0,
    scale: 0.87,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      ...pageTransition,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: {
      ...pageTransition,
    },
  },
};
