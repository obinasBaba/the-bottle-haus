import React from 'react';
import s from './featuredcollection.module.scss';
import { Button } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import Link from 'next/link';
import House from './houses.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { basicTransition } from '@/components/common/MotionItems';

export function SceneTitle({ title }: any) {
  return <h1 dangerouslySetInnerHTML={{ __html: title }} className={s.title} />;
}

const headerVariants = {
  initial: {},
  inView: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.25,
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
  return (
    <motion.div className={s.container}>
      <div className={s.house}>
        <Image src={House} alt="houses" />
      </div>

      <header className={s.header}>
        <SceneTitle title="Rated <span>Whiskeys</span>" />

        <Link href={'/collection/whiskey'}>
          <a>
            <Button variant="contained" size="large">
              Show All
            </Button>
          </a>
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
          whileInView="inView"
          viewport={{
            amount: 0.5,
            once: true,
          }}>
          {data.slice(a, b).map((product, idx) => (
            <motion.div
              key={product?.id || idx}
              variants={itemVariants}
              transition={basicTransition}>
              <ProductCard product={product} loading={!data} />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedCollection;
