import React, { useEffect } from 'react';
import s from './collectionpage.module.scss';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { Pagination } from '@mui/material';
import { useViewportScroll } from 'framer-motion';

type CollectionPageArgs = {
  products: Product[];
};

const CollectionPage: React.FC<CollectionPageArgs> = ({ products = [] }) => {
  const [totalPageCount, setTotalPageCount] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  useViewportScroll();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value * 9 - 9);
  };

  useEffect(() => {
    let ratio = Number.parseInt((products.length / 9).toFixed(0));
    ratio = products.length % 9 === 0 ? ratio : ratio + 1;

    setTotalPageCount(Number(ratio));
  }, []);

  return (
    <div className={s.container}>
      {products.length > 0 ? (
        <div className={s.wrapper}>
          <div className={s.list}>
            {products.slice(currentPage, currentPage + 9).map((product, idx) => (
              <ProductCard loading={false} product={product} key={idx} />
            ))}
          </div>

          <Pagination
            count={totalPageCount}
            defaultPage={3}
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
