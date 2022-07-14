import React from 'react';
import { motion, Variants } from 'framer-motion';

export const basicVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

const MotionParent = React.forwardRef((props: any, ref) => {
  return (
    <motion.div
      variants={basicVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      ref={ref}
      {...props}>
      {props.children}
    </motion.div>
  );
});

MotionParent.displayName = 'MotionParent';

const MotionChild = React.forwardRef((props: any, ref) => {
  return (
    <motion.div variants={basicVariants} ref={ref} {...props}>
      {props.children}
    </motion.div>
  );
});

MotionChild.displayName = 'MotionChild';

export { MotionChild, MotionParent };
