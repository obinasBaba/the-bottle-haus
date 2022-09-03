/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '@mui/material';
import s from './glassview.module.scss';

import Leaf from './media/side-leaf.png';
import LeafRight from './media/right-leaf.png';
import Bg2 from './media/image 27.png';
import Glass from './media/bott 1.png';
import Bubble from './media/bubbles.png';
import ReviewGlass from '@/scenes/Homepage/GlassView/ReviewGlass';
import { motion, useSpring, useTransform, Variants } from 'framer-motion';
import { useAppInfo } from '@/context/MotionValuesContext';

const texture = [
  { name: 'Bone Dry', level: 3 },
  { name: 'Dry', level: 3 },
  { name: 'Sweet', level: 3 },
  {
    name: 'Sour',
    level: 3,
  },
];

const transition = {
  duration: 1.5,
  ease: [0.6, 0.01, 0, 0.9],
  // delay: 0.2,
};

const glassVariants = {
  initial: {
    y: '20%',
    scale: 0.7,
    opacity: 0,
  },
  inView: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {},
};

const config = {
  mass: 1,
  stiffness: 50,
  damping: 20,
};

const leftVariants: Variants = {
  initial: {},
  inView: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.15,
    },
  },

  transition: {},
};

const leftItemsVariants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  inView: {
    opacity: 1,
    y: 0,
  },
};

const textureVariants: Variants = {
  ...leftItemsVariants,
  inView: {
    ...leftItemsVariants.inView,
    transition: {
      ...transition,
      staggerChildren: 0.15,
    },
  },
};

const bottomVariants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  inView: {
    opacity: 1,
    y: 0,
  },
};

const GlassView = () => {
  const {
    mouse: { mouseX, mouseY },
  } = useAppInfo();

  const y = useSpring(0, config);
  const x = useSpring(0, config);

  useTransform([mouseX, mouseY], ([xLatest, yLatest]) => {
    if (typeof window == 'undefined') return;

    // @ts-ignore
    x.set((xLatest - window.innerWidth / 2) / 50);

    // @ts-ignore
    y.set((yLatest - window.innerHeight / 2) / 50);
  });

  return (
    <motion.div
      className={s.container}
      variants={{}}
      initial="initial"
      animate="animate"
      whileInView="inView"
      viewport={{
        amount: 0.4,
        once: true,
      }}>
      <div className={s.free_layer}>
        <div className={s.bg}>
          <Image src={Bg2} alt="scene background" layout="fill" />
        </div>

        <div className={s.right_leaf}>
          <Image src={Leaf} alt="scene background" />
        </div>

        <div className={s.bubble}>
          <Image src={Bubble} alt="scene background" />
        </div>

        <motion.div className={s.left_leaf}>
          <motion.div style={{ x, y }}>
            <Image src={LeafRight} alt="scene background" />
          </motion.div>
        </motion.div>
      </div>

      <div className={s.huge_txt} data-scroll={true} data-scroll-speed={-1}>
        <h1>Golden Numbers</h1>
      </div>

      <motion.div className={s.content} variants={{}}>
        <div className={s.hor}>
          <motion.div className={s.left_txt} variants={leftVariants}>
            <div>
              <motion.header variants={leftItemsVariants} transition={transition}>
                <h1 className={s.name}>Vichy Alpino</h1>
                <div>
                  <small>
                    Single Grain
                    <small style={{ fontSize: '.65rem', color: '#f69857' }}>(250 review)</small>
                  </small>

                  <div className={s.rev}>
                    {Array.from(new Array(5)).map((value, idx) => (
                      <ReviewGlass key={idx} on={idx != 4} className={s.rev_svg} />
                    ))}
                  </div>
                </div>
              </motion.header>
              <motion.p variants={leftItemsVariants} transition={transition}>
                A 10-year-old single grain whiskey, matured in first-fill bourbon casks, Aromas of
                grassy oak, vanilla fudge, banana bread and runny honey fill the nose.
              </motion.p>

              <motion.div variants={leftItemsVariants} transition={transition}>
                <Button variant="contained" size="large" data-cursor="-opaque">
                  Shop Now
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className={s.glass} variants={glassVariants} transition={transition}>
            <Image src={Glass} alt="Glass of Whisky" />
          </motion.div>

          <motion.div className={s.right_txt} variants={leftVariants}>
            <motion.h2 variants={leftItemsVariants} transition={transition}>
              The Texture
            </motion.h2>

            <motion.div className={s.texture} variants={textureVariants} transition={transition}>
              {texture.map(({ name, level }, idx) => (
                <motion.div
                  className={s.t_item}
                  key={idx}
                  variants={leftItemsVariants}
                  transition={transition}>
                  <p>{name}</p>
                  <div className={s.level}>
                    {Array.from(new Array(5)).map((v, idx) => (
                      <span key={idx} className={clsx([idx <= level ? s.thick : s.thin])} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={s.bottom_txt}
          variants={bottomVariants}
          transition={{ ...transition, delay: 0.8 }}>
          <div>
            <small className={s.amount}>100%</small>
            <p>Available On Stock</p>
          </div>
          <div>
            <small className={s.amount}>5%</small>
            <p>Alcohol by volume</p>
          </div>
          <div>
            <small className={s.amount}>10</small>
            <p>Sold in packages of 10</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GlassView;
