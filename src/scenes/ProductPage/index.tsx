import React from 'react';
import s from './productpage.module.scss';
import ProductCardBig from '@/components/ProductDetailCard';
import ProductReview from './ProductReview';
import RelatedProducts from '@/scenes/ProductPage/RelatedProducts';

type ProductPageProps = {
  children?: React.ReactNode;
  product: any;
  relatedProducts: any[];
};

const ProductPage: React.FC<ProductPageProps> = ({ product, relatedProducts }) => {
  return (
    <div className={s.container}>
      {product && <ProductCardBig product={product} />}

      <RelatedProducts relatedProducts={relatedProducts} />

      <div className={s.suggest}>
        <ProductReview />
      </div>
    </div>
  );
};

export default ProductPage;
