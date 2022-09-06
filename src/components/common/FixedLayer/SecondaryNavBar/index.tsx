import React, { useState } from 'react';
import Link from 'next/link';
import { Collection } from '@/schema';
import s from './secondarynav.module.scss';
import { motion, Transition, Variants } from 'framer-motion';
import clsx from 'clsx';

const linkVariants: Variants = {
  initial: {
    opacity: 1,
    y: 0,
  },

  animate: {
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
  ease: [0.6, 0.01, 0, 0.9],
  // times: [0, 0.45, 0.48, 0.5, 1],
};

const SecondaryNavBar = ({ collections }: { collections: Collection[] }) => {
  const [data, setData] = useState([
    { name: 'All Product', slug: 'all-products' },
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
      <div className={s.wrapper}>
        {(collections || data).map(({ name, slug }) => (
          <Link href={`/collection/${slug}`} key={name}>
            <motion.a
              variants={linkVariants}
              transition={transition}
              initial="initial"
              whileHover="hover"
              data-cursor="-opaque"
              animate="animate">
              <motion.p className={s.linkText}>{name}</motion.p>
              <motion.p className={clsx([s.linkText])}>{name}</motion.p>
            </motion.a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default SecondaryNavBar;
