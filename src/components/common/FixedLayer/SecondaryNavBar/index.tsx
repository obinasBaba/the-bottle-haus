import React, { useState } from 'react';
import Link from 'next/link';
import { Collection } from '@/schema';
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
  const [data, setData] = useState([
    {
      name: 'All Product',
      slug: 'all-products',
    },
    { name: 'Whiskey' },
    { name: 'Alcohol' },
    { name: 'Wine' },
    { name: 'Celebrity Spirits' },
    { name: 'Haus Bundles' },
    { name: 'Barrel Picks' },
    { name: 'Corporate Gifting' },
  ]);

  return (
    <nav className={s.container}>
      <MotionChild className={s.wrapper} variants={boxContainerVariants}>
        {(collections || data).map(({ name, slug }) => (
          <MotionChild key={name} variants={linkVariants}>
            <Link href={`/collection/${slug}`}>
                <motion.p className={s.linkText}>{name}</motion.p>
                <motion.p className={clsx([s.linkText])}>{name}</motion.p>
            </Link>
          </MotionChild>
        ))}
      </MotionChild>
    </nav>
  );
};

export default SecondaryNavBar;
