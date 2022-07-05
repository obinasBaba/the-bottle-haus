import React from 'react';
import { motion, Variants } from 'framer-motion';

const wrapperVariants: Variants = {
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

const MotionWrapper = React.forwardRef((props: any, ref) => {
  return (
    <motion.div
      variants={wrapperVariants}
      initial="initial"
      animate="animate"
      ref={ref}
      exit="exit"
      {...props}>
      {props.children}
    </motion.div>
  );
});

MotionWrapper.displayName = 'MotionWrapper';

export default MotionWrapper;
