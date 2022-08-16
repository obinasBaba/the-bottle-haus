import React, { useEffect } from 'react';
import s from './collectionpage.module.scss';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { Pagination } from '@mui/material';
import { motion, MotionConfig, Variants } from 'framer-motion';
import { useLocomotiveScroll } from '@/context/LocoMotive';

type CollectionPageArgs = {
  products: Product[];
};

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};
const itemVariants = {
  initial: {
    opacity: 0,
    y: '15%',
  },
  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
  },
};

const CollectionPage: React.FC<CollectionPageArgs> = ({ products = [] }) => {
  const [totalPageCount, setTotalPageCount] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const { scroll } = useLocomotiveScroll();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    scroll?.scrollTo(0, {
      duration: 1,
      easing: [0.6, 0.01, 0, 0.9],
      callback: () => {
        setTimeout(() => setCurrentPage(value * 9 - 9), 500);
      },
    });
  };

  useEffect(() => {
    if (products.length <= 9) {
      return setTotalPageCount(1);
    }
    let ratio = Number.parseInt((products.length / 9).toFixed(0));
    ratio = products.length % 9 === 0 ? ratio : ratio + 1;

    setTotalPageCount(Number(ratio));
  }, [products]);

  return (
    <div className={s.container}>
      {products.length > 0 ? (
        <div className={s.wrapper}>
          <motion.div
            className={s.list}
            variants={containerVariants}
            key={products.length + currentPage}>
            <MotionConfig
              transition={{
                duration: 0.8,
                ease: [0.6, 0.01, 0, 0.9],
              }}>
              {products.slice(currentPage, currentPage + 9).map((product, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <ProductCard loading={false} product={product} />
                </motion.div>
              ))}
            </MotionConfig>
          </motion.div>

          <Pagination
            count={totalPageCount}
            defaultPage={1}
            siblingCount={0}
            color="primary"
            size="large"
            className={s.pagination}
            onChange={handleChange}
          />
        </div>
      ) : (
        <p>
          <big> This collection is currently Empty </big>
        </p>
      )}
    </div>
  );
};

export default CollectionPage;
