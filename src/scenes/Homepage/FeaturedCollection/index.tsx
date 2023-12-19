import React from 'react';
import s from './featuredcollection.module.scss';
import { Button } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import Link from 'next/link';
import House from './houses.png';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { basicTransition } from '@/components/common/MotionItems';
import { useAppInfo } from '@/context/MotionValuesContext';

export function SceneTitle({ title }: any) {
  return <h1 dangerouslySetInnerHTML={{ __html: title }} className={s.title} />;
}

const headerVariants: Variants = {
  initial: {
    overflow: 'hidden',
  },
  inView: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.25,
    },
    transitionEnd: {
      overflow: 'visible',
    },
  },
};

const titleVariants = {
  initial: {
    // y: '100%',
    // opacity: 0,
  },
  inView: {
    opacity: 1,
    y: 0,
  },
};

const btnVariants = {
  initial: {
    // y: '100%',
    // opacity: 0,
  },
  inView: {
    opacity: 1,
    y: 0,
  },
};

const itemVariants = {
  initial: {
    y: '30%',
    opacity: 0,
  },
  inView: {
    opacity: 1,
    y: 0,
  },
};

const FeaturedCollection = ({ data }: { data: Product[] }) => {
  const { scrollState } = useAppInfo();

  return (
    <motion.div className={s.container} id="featured-collection">
      <div className={s.house}>
        <Image src={House} alt="houses" />
      </div>

      <header className={s.header}>
        <SceneTitle title="Rated <span>Whiskeys</span>" />

        <Link href={'/collection/whiskey'}>
          <Button variant="contained" size="large" data-cursor="-opaque">
            Show All
          </Button>
        </Link>
      </header>

      {[
        [0, 4],
        [4, 8],
      ].map(([a, b], idx) => (
        <motion.div
          key={a}
          className={s.whiskeyWrapper}
          variants={headerVariants}
          initial="initial"
          animate="animate"
          whileInView="inView"
          exit="exit"
          viewport={{
            amount: 0.1,
            once: true,
          }}>
          {data.slice(a, b).map((product, idx) => (
            <motion.div
              key={product?.id || idx}
              variants={itemVariants}
              transition={basicTransition}
              onClick={() => {
                scrollState.set({ ...scrollState.get(), remember: true });
              }}>
              <ProductCard product={product} loading={false} />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedCollection;
