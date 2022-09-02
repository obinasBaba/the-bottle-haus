import React, { useContext, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { Pagination } from '@mui/material';
import { AnimatePresence, motion, MotionConfig, MotionValue, Variants } from 'framer-motion';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { CollectionsContext } from '@/pages/collection/[slug]';
import s from './collectionpage.module.scss';

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
  exit: {
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

// sort,

type CollectionPageArgs = {
  products: Product[];
  rf: MotionValue<Record<string, any>>;
};

const CollectionPage: React.FC<CollectionPageArgs> = ({ products, rf }) => {
  const [totalPageCount, setTotalPageCount] = React.useState<number>(1);
  const [refreshId, setRefreshId] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const { scroll } = useLocomotiveScroll();

  const { sortInfo } = useContext(CollectionsContext);

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

  useEffect(() => {
    // console.log('sortInfo: ', sortInfo);
    setRefreshId(refreshId + 1);
  }, [sortInfo]);

  return (
    <div className={s.container}>
      {products.length > 0 ? (
        <div className={s.wrapper}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              className={s.list}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={products.length + currentPage + refreshId}>
              <MotionConfig
                transition={{
                  duration: 0.8,
                  ease: [0.6, 0.01, 0, 0.9],
                }}>
                {products
                  .slice(currentPage, currentPage + 9)
                  .sort((a, b) => (a.price.value > b.price.value ? 1 : -1))
                  .map((product, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <ProductCard loading={false} product={product} />
                    </motion.div>
                  ))}
              </MotionConfig>
            </motion.div>
          </AnimatePresence>

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
