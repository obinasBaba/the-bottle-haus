import React from 'react';
import Head from 'next/head';
import s from './Home.module.scss';
import Hero from './Hero';
import VideoAd from '@homepage/VideoAd';
import RareToFind from '@homepage/RareToFind';
import OtherSaying from '@homepage/OtherSaying';
import SlideShow from '@homepage/SlideShow';
import FeaturedGrid from '@homepage/FeaturedGrid';
import ProductCardBig from '@/components/ProductCardBig';
import OurBlog from '@homepage/OurBlog';
import { ProductTypes } from '@/types/product';
import FeaturedCollection from '@homepage/FeaturedCollection';

type HomepageProps = {
  featuredProduct: ProductTypes['product'];
};

const HomePage: React.FC<HomepageProps> = ({ featuredProduct }) => {
  return (
    <div className={s.container}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="the bottle haus homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <VideoAd />
      <FeaturedCollection />
      <RareToFind />
      <OtherSaying />
      <SlideShow />
      <FeaturedGrid />
      <ProductCardBig product={featuredProduct} />
      <OurBlog />
    </div>
  );
};

export default HomePage;
