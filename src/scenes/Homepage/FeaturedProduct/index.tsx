import React from 'react';
import ProductCardBig from '@/components/ProductDetailCard';
import Image from 'next/image';
import DonPablo from './don-pablo.png';
import Opener from '@/components/ProductDetailCard/opener.png';
import { motion } from 'framer-motion';
import s from './featuredproduct.module.scss';

const FeaturedProduct = ({ featuredProduct }: any) => {
  return (
    <motion.div className={s.container}>
      <div className={s.opener}>
        <div data-scroll={true} data-scroll-delay={0.05} data-scroll-speed={-1.5}>
          <Image src={Opener} alt="product bg" />
        </div>
      </div>

      <ProductCardBig
        productBg={true}
        product={{ ...featuredProduct, images: [{ url: DonPablo.src }] }}
      />
    </motion.div>
  );
};

export default FeaturedProduct;
