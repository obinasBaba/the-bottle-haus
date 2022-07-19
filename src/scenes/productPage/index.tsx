import React from 'react';
import s from './productpage.module.scss';
import ProductCardBig from '@/components/ProductDetailCard';
import ProductReview from './ProductReview';

type ProductPageProps = {
  children?: React.ReactNode;
  product: any;
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <div className={s.container}>
      <ProductCardBig product={product} />
      <div className="product_page_wrapper">
        <ProductReview />
      </div>
    </div>
  );
};

export default ProductPage;
