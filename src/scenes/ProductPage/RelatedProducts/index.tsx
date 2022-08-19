import React from 'react';
import s from './relatedproducts.module.scss';
import ProductCard from '@/components/ProductCard';
import { dummyProduct } from '@/components/ProductDetailCard';
import Image from 'next/image';
import WhiteBg from '@/public/white-bg.png';

const RelatedProducts = () => {
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
          {Array.from(new Array(4)).map((value, idx) => (
            <ProductCard loading={false} product={dummyProduct} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
