// noinspection JSIgnoredPromiseFromCall,ES6MissingAwait

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import s from './apptooltip.module.scss';
import { useMotionValues } from '@/context/MotionValuesContext';
import Bg from './img.png';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';
import RouteChangeEvent from '@/util/helpers/RouteChangeEvent';
import LottiLoading from '@/components/LottiLoading';

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
  const [showLoading, setShowLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    controller.start('exit');
  }, [pathname, controller]);

  // subscription
  useLayoutEffect(() => {
    toolTipsData.onChange(async (v) => {
      if (v.id === 'reset') return;

      if (v.show && v.text) {
        toolTipTextNode.current.innerHTML = v.text;
        if (v.loading) setShowLoading(true);

        controller.start('animate');
      } else {
        controller.start('exit').then(() => {
          setShowLoading(false);
        });
        // toolTipsData.set();
        toolTipsData.updateAndNotify({ id: 'reset', ...toolTipsData.get() }, false);
      }
    });

    return () => toolTipsData.clearListeners();
  }, [toolTipsData, controller]);

  useEffect(() => {
    const event = RouteChangeEvent.GetInstance();

    const show = () =>
      toolTipsData.set({ show: true, text: 'loading resources ...', loading: true });
    const hide = () => toolTipsData.set({ show: false });

    event.addListener('start', show);

    event.addListener('end', hide);

    return () => {
      event.removeListener('start', show);
      event.removeListener('end', hide);
    };
  }, [toolTipsData]);

  return (
    <motion.div
      className={s.container}
      variants={containerVariant}
      initial="initial"
      animate={controller}
      exit="exit">
      <div className="bg">
        <Image src={Bg} objectFit="cover" alt="cover image" />
      </div>

      <div className="tooltip_wrapper">
        {showLoading && <LottiLoading />}

        <small className="tip" ref={toolTipTextNode}>
          this is a tool tip
        </small>
      </div>
    </motion.div>
  );
};

export default AppToolTip;
