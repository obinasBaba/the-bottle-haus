import React from 'react';
import s from './featuredproduct.module.scss';
import ProductCardBig from '@/components/ProductDetailCard';

import DonPablo from './don-pablo.png';
import Image from 'next/image';
import Opener from '@/components/ProductDetailCard/opener.png';

const FeaturedProduct = ({ featuredProduct }: any) => {
  return (
    <div className={s.container}>
      <div className={s.opener}>
        <div data-scroll={true} data-scroll-delay={0.05} data-scroll-speed={-1.5}>
          <Image src={Opener} alt="product bg" />
        </div>
      </div>

      <ProductCardBig
        productBg={true}
        product={{ ...featuredProduct, images: [{ url: DonPablo.src }] }}
      />
    </div>
  );
};

export default FeaturedProduct;
