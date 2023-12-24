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
    y: '100%',
  },

  animate: {
    opacity: 1,
    y: 0,
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
          <MotionChild key={handle} variants={linkVariants}>
            <Link href={`/collection/${handle}`}>
              <motion.p className={s.linkText}>{title}</motion.p>
              <motion.p className={clsx([s.linkText])}>{title}</motion.p>
            </Link>
          </MotionChild>
        ))}
      </MotionChild>
    </nav>
  );
};

export default SecondaryNavBar;
