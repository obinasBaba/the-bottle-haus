import React from 'react';
import Head from 'next/head';
import s from './Home.module.scss';
import Hero from './Hero';
import VideoAd from '@homepage/VideoAd';
import RareToFind from '@homepage/RareToFind';
import Testimonials from '@homepage/OtherSaying';
import SlideShow from '@homepage/SlideShow';
import FeaturedGrid from '@homepage/FeaturedGrid';
import ProductCardBig from '@/components/ProductCardBig';
import OurBlog from '@homepage/OurBlog';
import { Product, ProductTypes } from '@/types/product';
import FeaturedCollection from '@homepage/FeaturedCollection';
import { MotionParent } from '@/components/common/MotionItems';
import HorizontalMarquee from '@homepage/HorizontalMarqee';

type HomepageProps = {
  featuredProduct: ProductTypes['product'];
  featuredCollections: Product[];
  rareToFind: Product[];
};

const HomePage: React.FC<HomepageProps> = ({
  featuredProduct,
  featuredCollections,
  rareToFind,
}) => {
  return (
    <MotionParent className={s.container}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="the bottle haus homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <VideoAd />
      <HorizontalMarquee />
      <FeaturedCollection data={featuredCollections} />
      <RareToFind data={rareToFind} />
      <Testimonials />
      <SlideShow />
      <ProductCardBig product={featuredProduct} />
      <FeaturedGrid />
      <OurBlog />
    </MotionParent>
  );
};

export default HomePage;
