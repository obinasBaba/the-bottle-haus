import React from 'react';
import s from './productpage.module.scss';
import ProductCardBig from '@/components/ProductDetailCard';
import ProductReview from './ProductReview';
import RelatedProducts from '@/scenes/ProductPage/RelatedProducts';

type ProductPageProps = {
  children?: React.ReactNode;
  product: any;
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <div className={s.container}>
      {product && <ProductCardBig product={product} />}

      <RelatedProducts />

      <div className={s.suggest}>
        <ProductReview />
      </div>
    </div>
  );
};

export default ProductPage;
