'use client';

import React from 'react';
import ProductCardBig from '@/components/ProductDetailCard';
import ProductReview from './ProductReview';
import RelatedProducts from '@/scenes/ProductPage/RelatedProducts';
import s from './productpage.module.scss';
import { Product } from '@lib/types';
import { PageTransitionContainer } from '@/components/common/MotionItems';

type ProductPageProps = {
  children?: React.ReactNode;
  product: Product;
  relatedProducts: Product[];
};

const ProductPage: React.FC<ProductPageProps> = ({ product, relatedProducts }) => {
  return (
    <PageTransitionContainer className={s.container}>
      {product && <ProductCardBig product={product} />}

      <RelatedProducts relatedProducts={relatedProducts.slice(0, 8)} />

      <div className={s.suggest}>
        <ProductReview />
      </div>
    </PageTransitionContainer>
  );
};

export default ProductPage;
