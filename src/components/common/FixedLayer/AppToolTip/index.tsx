import React, { useLayoutEffect, useRef } from 'react';
import s from './apptooltip.module.scss';
import { useMotionValues } from '@/context/MotionValuesContext';
import Bg from './img.png';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';

const containerVariant = {
  initial: {
    opacity: 0,
    y: 25,
  },

  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2 * 0.5,
      ease: 'easeIn',
    },
  },

  exit: {
    y: -25,
    opacity: 0,
    transition: {
      duration: 1.2 * 0.5,
      ease: [0.6, 0.01, 0, 0.9],
    },
    transitionEnd: {
      y: 25,
    },
  },
};

const AppToolTip = () => {
  const { toolTipsData } = useMotionValues();
  const controller = useAnimation();
  const { pathname } = useRouter();
  const toolTipTextNode = useRef<any>();

  useLayoutEffect(() => {
    controller.start('exit');
  }, [pathname]);

  useLayoutEffect(() => {
    toolTipsData.onChange(async (v) => {
      if (v.show) {
        toolTipTextNode.current.innerHTML = v.text;
        controller.start('animate');
      } else controller.start('exit');
    });
  }, []);

  return (
    <motion.div
      className={s.container}
      variants={containerVariant}
      initial="initial"
      animate={controller}
      exit="exit">
      <div className="bg">
        <Image src={Bg} objectFit="cover" />
      </div>

      <div className="tooltip_wrapper">
        <small className="tip" ref={toolTipTextNode}>
          this is a tool tip
        </small>
      </div>
    </motion.div>
  );
};

export default AppToolTip;
