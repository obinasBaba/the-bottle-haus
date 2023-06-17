import { Variants } from 'framer-motion';

export const signInVariant = {
  initial: {
    opacity: 0,
  },
  signIn: {
    opacity: 1,
  },

  signUp: {
    opacity: 0,
  },
};
export const signOutVariant = {
  initial: {
    opacity: 0,
  },
  signIn: {
    opacity: 0,
  },
  signUp: {
    opacity: 1,
  },
};
export const text: Variants = {
  initial: {
    opacity: 0,
  },
  signIn: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 1.4,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },

  signUp: {
    opacity: 0,
    transition: {
      duration: 0.7,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
};
export const registrationModalVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};
export const transition = {
  duration: 1,
  ease: [0.6, 0.01, 0, 0.9],
};
export const blurVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
      duration: 1.2,
      ease: [0.6, 0.01, 0, 0.9],
    },
  },
};
export const blurTransition = {
  duration: 1.2,
  ease: [0.165, 0.84, 0.44, 1],
};
