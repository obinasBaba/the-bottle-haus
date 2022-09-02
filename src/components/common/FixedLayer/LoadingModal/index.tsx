import React, { useEffect } from 'react';
import s from './loadingmodal.module.scss';

import LoadingBg from '@/public/loading-bg.png';
import Logo from '@/public/logo-4.png';
import Image from 'next/image';
import { MotionParent } from '@/components/common/MotionItems';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUI } from '@/context/ui/context';

const loadingVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

const LoadingModal = () => {
  // const time = useTime();
  // const rotate = useTransform(time, [0, 4000], [0, 1], { clamp: false });

  const pathLength = useMotionValue(0.1);
  const smoothPathLength = useSpring(pathLength, {
    mass: 0.5,
    damping: 15,
    stiffness: 50,
  });
  const { closeLoadingModal } = useUI();

  useEffect(() => {
    const interval: any = setInterval(() => {
      if (pathLength.get() == 1) {
        clearInterval(interval);
        return closeLoadingModal();
      }
      pathLength.set(pathLength.get() + 0.3);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <MotionParent className={s.container} variants={loadingVariants}>
      <motion.div className={s.bg}>
        <Image src={LoadingBg} layout="fill" alt="loading background" />
        <Image src={Logo} alt="customized logo" />

        <motion.svg
          width="296"
          height="296"
          viewBox="0 0 276 276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <motion.circle
            cx="138"
            cy="138"
            r="133"
            stroke="#9D6F4D"
            strokeWidth="5"
            pathLength={smoothPathLength}
          />
        </motion.svg>
      </motion.div>
    </MotionParent>
  );
};

export default LoadingModal;
