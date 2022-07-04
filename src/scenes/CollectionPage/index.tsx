import React, { useEffect } from 'react';
import s from './collectionpage.module.scss';
import { useRouter } from 'next/router';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

type CollectionPageArgs = {
  products: Product[];
};

const CollectionPage: React.FC<CollectionPageArgs> = ({ products = [] }) => {
  useEffect(() => {
    console.log('collections: <', products);
  }, [products]);

  return (
    <div className={s.container}>
      <div className="list">
        {products.map((product, idx) => (
          <ProductCard loading={false} product={product} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
