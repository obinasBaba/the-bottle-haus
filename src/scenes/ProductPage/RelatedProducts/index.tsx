import React from 'react';
import s from './relatedproducts.module.scss';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import WhiteBg from '@/public/white-bg.png';
import { Product } from '@lib/types';

const RelatedProducts = ({ relatedProducts }: { relatedProducts: Product[] }) => {
  return (
    <div className={s.container}>
      <div className={s.bg}>
        <Image src={WhiteBg} alt="white bg" objectFit="cover" />
      </div>

      <div className={s.wrapper}>
        <div className={s.header}>
          <h1>
            Related
            <span>Products</span>
          </h1>
        </div>

        <div className={s.list}>
          {relatedProducts.map((product) => (
            <ProductCard loading={false} product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
