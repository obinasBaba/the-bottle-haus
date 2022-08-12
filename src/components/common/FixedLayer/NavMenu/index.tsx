import React from 'react';
import s from './navmenu.module.scss';
import data from './data';
import { Button } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import { useUI } from '@/context/ui/context';
import { basicVariants, MotionChild, MotionParent } from '@/components/common/MotionItems';
import Link from 'next/link';
import { CloseMenuButton } from '@fixedLayer/NavMenu/closeMenuButton';

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
  { name: 'All Product', link: '/collection/all-product' },
  { name: 'Cart', link: '/cart' },
  { name: 'Contact-us', link: '/contact-us' },
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
        <CloseMenuButton onClick={() => closeNavMenu()} />

        <motion.div className="link_list" variants={linkContainerVariants}>
          {links.map(({ name, link }, idx) => (
            <motion.div
              className="item"
              key={name}
              variants={linkItemVariant}
              transition={transition}
              onClick={() => setTimeout(() => closeNavMenu(), 400)}>
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
