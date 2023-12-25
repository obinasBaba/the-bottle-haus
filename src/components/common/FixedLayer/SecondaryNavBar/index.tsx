'use client'

import React from 'react';
import Link from 'next/link';
import { Collection } from '@/lib/types';
import s from './secondarynav.module.scss';
import { motion, Transition, Variants } from 'framer-motion';
import clsx from 'clsx';
import { MotionChild } from '@/components/common/MotionItems';
import { boxContainerVariants } from '@/scenes/CheckoutPage/transition';

const linkVariants: Variants = {
  initial: {
    opacity: 0,
    y: 0,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  hover: {
    // opacity: [null, 1, 0, 0, 1],
    // y: [null, '-100%', '-100%', '100%', '0%'],
    y: '-100%',
  },
};

const transition: Transition = {
  duration: 0.6,
  ease: [0.6, 0.01, 0, 0.9], // times: [0, 0.45, 0.48, 0.5, 1],
};

const SecondaryNavBar = ({ collections }: { collections: Collection[] }) => {
  return (
    <nav className={s.container}>
      <MotionChild className={s.wrapper} variants={boxContainerVariants}>
        {collections.map(({ title, handle }) => (
            <Link key={handle} href={`/collection/${handle}`}>

              <motion.div
                className={s.link_wrap}
                variants={linkVariants}
                transition={transition}
                initial="initial"
                whileHover="hover"
                data-cursor="-opaque"
                animate="animate">
                <motion.p className={s.linkText}>{title}</motion.p>
                <motion.p className={clsx([s.linkText, s.secondary_link_txt])}>{title}</motion.p>
              </motion.div>
            </Link>
        ))}
      </MotionChild>
    </nav>);
};

export default SecondaryNavBar;
