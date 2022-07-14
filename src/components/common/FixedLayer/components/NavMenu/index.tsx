import React from 'react';
import s from './navmenu.module.scss';
import data from './data';
import { Button } from '@mui/material';
import { Variants } from 'framer-motion';
import { useUI } from '@/context/ui/context';
import { basicVariants, MotionChild, MotionParent } from '@/components/common/MotionItems';

const blurBgVariants = Object.setPrototypeOf(
  {
    transition: {
      duration: 0.8,
      ease: [0.5, 0, 0.75, 0],
    },
  },
  basicVariants,
);

const menuVariants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
  },
  exit: {
    x: '100%',
  },

  transition: {
    duration: 0.8,
    ease: [1, 0, 0.68, 1],
  },
};

const footerContainerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const footBtnVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.93,
    y: '-80%',
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.93,
    y: '-80%',
  },
};

const linkContainerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      when: 'beforeChildren',
    },
  },
};

const linkItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: '-100%',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '-100%',
  },
};

const NavMenu = () => {
  const { closeNavMenu } = useUI();

  return (
    <MotionParent className={s.container} variants={{}}>
      <MotionChild
        className="blur_bg"
        onClick={() => closeNavMenu()}
        variants={blurBgVariants}
        transition={blurBgVariants.transition}
      />

      <MotionChild
        className="menu_wrapper"
        variants={menuVariants}
        transition={menuVariants.transition}>
        <button
          aria-label="close menu"
          className="close_cross"
          type="button"
          onClick={() => closeNavMenu()}>
          <svg width={'100%'} height="100%" viewBox="0 0 87 87">
            <g stroke="#171614" strokeWidth="8" fill="none" fillRule="evenodd">
              <path className="_1s9fS" d="M4.5 3.5l39.573 39.573"></path>
              <path className="_1s9fS" d="M83.5 3.5L44.073 43.073"></path>
              <path className="_1s9fS" d="M83.5 82.5L44.073 43.073"></path>
              <path className="_1s9fS" d="M4.5 82.5l39.573-39.427"></path>
            </g>
          </svg>
        </button>

        <div className="link_list">
          <div className="item">
            <p className="no">(01)</p>
            <h1>Home</h1>
          </div>
          <div className="item">
            <p className="no">(02)</p>
            <h1>All Product</h1>
          </div>
          <div className="item">
            <p className="no">(03)</p>
            <h1>Blogs</h1>
          </div>
          <div className="item">
            <p className="no">(04)</p>
            <h1>Contact-us</h1>
          </div>
        </div>

        <footer>
          <div className="hor">
            {data.slice(0, 2).map(({ icon, bg, text }) => (
              <Button variant="outlined" size="large" key={text}>
                {text}
              </Button>
            ))}
          </div>

          <div className="hor">
            {data.slice(2, 4).map(({ icon, bg, text }) => (
              <Button variant="outlined" size="large" key={text}>
                {text}
              </Button>
            ))}
          </div>
        </footer>

        <div className="bottom_gradient" />
      </MotionChild>
    </MotionParent>
  );
};

export default NavMenu;
