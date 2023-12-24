'use client';

import React, { useEffect, useState } from 'react';
import s from './loadingmodal.module.scss';

import LoadingBg from '@/public/loading-bg.png';
import Logo from '@/public/logo-4.png';
import Image from 'next/image';
import { MotionParent } from '@/components/common/MotionItems';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useUI } from '@/context/ui/context';
import { pageTransition } from '@/scenes/Homepage';
import { useAppInfo } from '@/context/MotionValuesContext';
import { usePathname } from 'next/navigation';

const logoVariants = {
  initial: {
    opacity: 0.0,
    scale: 0.5,
    rotate: '30deg',
  },

  animate: {
    opacity: 1,
    scale: 1,
    rotate: '0deg',

    transition: {
      opacity: {
        delay: 0.3,
        duration: 1.7,
        ease: [1, 0, 0.68, 1],
      },

      delay: 0.7,
      ...pageTransition,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.9,
    rotate: '30deg',

    transition: {
      // delay: 1.175,
      duration: 1,
      ease: [1, 0, 0.68, 1], // staggerChildren: 0.06,
    },
  },
};

const containerVariants = {
  initial: {
    // opacity: 0,
    y: 0,
    opacity: 1,
  },
  animate: {
    // opacity: 1,
  },

  exit: {
    opacity: 0,
    y: '-100%',
  },
};

const LoadingModal = () => {
  // const time = useTime#000();
  // const rotate = useTransform(time, [0, 4000], [0, 1], { clamp: false });

  const pathLength = useMotionValue(0);
  const [ready, setReady] = useState(false);

  const { toolTipsData, PageAnimationEvent, PageAnimationController } = useAppInfo();

  const smoothPathLength = useSpring(pathLength, {
    mass: 0.5,
    damping: 15,
    stiffness: 50,
  });
  const { closeLoadingModal } = useUI();

  /*useLayoutEffect(() => {
    toolTipsData.set({
      show: true,
      text: 'Loading Resources ...',
      loading: true,
      closable: false,
    });

    return () => {
      toolTipsData.set({
        show: false,
      });
    };
  });
*/
  useEffect(() => {
    if (!ready) return;

    const interval: any = setInterval(() => {
      if (pathLength.get() > 0.9) {
        clearInterval(interval);
        return closeLoadingModal();
      }
      pathLength.set(pathLength.get() + 0.35555);
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [ready]);

  return (
    <MotionParent className={s.container}>
      <motion.div className={s.bg}>
        <Image src={LoadingBg} layout="fill" alt="loading background" />

        <motion.div
          className={s.logo_wrapper}
          variants={logoVariants}
          transition={pageTransition}
          onAnimationStart={(state) => {
            PageAnimationEvent.set('started');
            // console.log('on animation start', state);
          }}
          onAnimationComplete={(state) => {
            // console.log('on animation complete', state);

            if (state == 'animate') setReady(true);

            if (state === 'exit') {
              PageAnimationController.start('animate');
              PageAnimationEvent.set('finished');
            }
          }}>
          <div className={s.logo}>
            <Image src={Logo} alt="customized logo" />
          </div>

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
              stroke="rgba(157, 111, 77, .4)"
              strokeWidth="5"
              // pathLength={smoothPathLength}
            />

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
      </motion.div>
    </MotionParent>
  );
};

export default function LoadingModalWrapper() {
  const { navMenu, displayModal, searchModal, loadingModal, closeLoadingModal } = useUI();
  const currentPath = usePathname();

  return (
    <AnimatePresence mode="wait">
      {loadingModal && !currentPath?.includes('sign-in') && <LoadingModal />}
    </AnimatePresence>
  );
}
