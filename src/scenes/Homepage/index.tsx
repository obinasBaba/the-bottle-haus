import React, { useEffect } from 'react';
import Head from 'next/head';
import s from './homepage.module.scss';
import Hero from './Hero';
import VideoAd from './/VideoAd';
import RareToFind from './/RareToFind';
import Testimonials from './/OtherSaying';
import SlideShow from './/SlideShow';
import FeaturedGrid from './/FeaturedGrid';
import OurBlog from './/OurBlog';
import { Product, ProductTypes } from '@/types/product';
import FeaturedCollection from './/FeaturedCollection';
import { MotionParent } from '@/components/common/MotionItems';
import HorizontalMarquee from './/HorizontalMarqee';
import FeaturedProduct from './/FeaturedProduct';

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
      <FeaturedProduct featuredProduct={featuredProduct} />
      <FeaturedGrid />
      <OurBlog />
    </MotionParent>
  );
};

export default HomePage;
