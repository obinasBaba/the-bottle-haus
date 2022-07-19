import React from 'react';
import s from './featuredproduct.module.scss';
import ProductCardBig from '@/components/ProductDetailCard';

const FeaturedProduct = ({ featuredProduct }: any) => {
  return (
    <div className={s.container}>
      <ProductCardBig product={featuredProduct} />
    </div>
  );
};

export default FeaturedProduct;
