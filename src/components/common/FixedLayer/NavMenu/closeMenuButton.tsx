import React, { useEffect, useState } from 'react';
import { motion, Transition, Variants } from 'framer-motion';
import { IconButton } from '@mui/material';
import s from './navmenu.module.scss';
import clsx from 'clsx';

const variants: Variants = {
  initial: {
    opacity: 0.2,
    rotate: '180deg',
    scale: 0.2,
  },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
  },

  exit: {
    opacity: 0,
    rotate: '180deg',
    scale: 0.1,
    transition: {
      delay: 0,
      duration: 1,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
};

const transition: Transition = {
  delay: 0.7,
  duration: 0.8,
  ease: [0.165, 0.84, 0.44, 1],
};

export function CloseMenuButton(props: { onClick: () => void }) {
  const [attachHover, setAttachHover] = useState(false);

  useEffect(() => {
    const toggle = () => setAttachHover(true);
    window.addEventListener('mousemove', toggle, { once: true });

    return () => {
      window.removeEventListener('mousemove', toggle);
    };
  }, []);

  return (
    <motion.div
      variants={variants}
      transition={transition}
      aria-label="close menu"
      className={clsx([s.close_button, attachHover && s.hover_event])}
      onClick={props.onClick}>
      <IconButton color="primary" className={s.close_cross}>
        <svg width="100%" height="100%" viewBox="0 0 87 87">
          <g stroke="#171614" strokeWidth="8" fill="none" fillRule="evenodd">
            <path className="_1s9fS" d="M4.5 3.5l39.573 39.573"></path>
            <path className="_1s9fS" d="M83.5 3.5L44.073 43.073"></path>
            <path className="_1s9fS" d="M83.5 82.5L44.073 43.073"></path>
            <path className="_1s9fS" d="M4.5 82.5l39.573-39.427"></path>
          </g>
        </svg>
      </IconButton>
    </motion.div>
  );
}
