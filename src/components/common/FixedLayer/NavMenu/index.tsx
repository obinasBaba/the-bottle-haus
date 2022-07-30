import React from 'react';
import s from './navmenu.module.scss';
import data from './data';
import { Button } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import { useUI } from '@/context/ui/context';
import { basicVariants, MotionChild, MotionParent } from '@/components/common/MotionItems';
import Link from 'next/link';

const transition = {
  duration: 1.2,
  ease: [0.165, 0.84, 0.44, 1],
};

export const blurBgVariants = Object.setPrototypeOf(
  {
    transition: {
      duration: 0.8,
      ease: [0.165, 0.84, 0.44, 1],
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
    duration: 1,
    ease: [0.6, 0.01, 0, 0.9],
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

const linkItemVariant: any = {
  initial: {
    opacity: 0,
    x: '80%',
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: {
        delay: 0.2,
        duration: 1.4,
        ease: [0.6, 0.01, 0, 0.9],
      },
      default: {
        duration: 1.2,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  },
  exit: {
    opacity: 0,
    x: '20%',
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, 0, 0.9],
    },
  },
  transition: {
    duration: 1.2,
    ease: [0.165, 0.84, 0.44, 1],
  },
};

const footerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const footerItemVariant: any = {
  initial: {
    y: '130%',
  },
  animate: {
    y: 0,
  },
  exit: {
    opacity: 0,
  },

  transition: {
    duration: 1.2,
    ease: [0.165, 0.84, 0.44, 1],
  },
};

const links = [
  { name: 'Home', link: '/' },
  { name: 'All Product', link: '/collections/all-product' },
  { name: 'Blogs', link: '/blog' },
  { name: 'Contact-us', link: '/' },
];

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

        <motion.div className="link_list" variants={linkContainerVariants}>
          {links.map(({ name, link }, idx) => (
            <motion.div
              className="item"
              key={name}
              variants={linkItemVariant}
              transition={transition}>
              <Link href={link}>
                <a>
                  <p className="no">(0{idx + 1})</p>
                  <h1>{name}</h1>
                </a>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.footer variants={footerVariant}>
          <div className="hor">
            {data.map(({ icon, bg, text }) => (
              <motion.div
                key={text}
                variants={footerItemVariant}
                transition={footerItemVariant.transition}>
                <Button variant="outlined" size="small">
                  {text}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.footer>

        <div className="bottom_gradient" />
      </MotionChild>
    </MotionParent>
  );
};

export default NavMenu;
