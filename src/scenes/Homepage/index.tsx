import React from 'react';
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
import { useLocomotiveScroll } from '@/context/LocoMotive';

type HomepageProps = {
  featuredProduct: ProductTypes['product'];
  featuredCollections: Product[];
  rareToFind: Product[];
};

export const pageTransition = {
  duration: 1.5,
  ease: [0.6, 0.01, 0, 0.9],
};

const HomePage: React.FC<HomepageProps> = ({
  featuredProduct,
  featuredCollections,
  rareToFind,
}) => {
  const { scale } = useLocomotiveScroll();

  return (
    <MotionParent transition={pageTransition} className={s.container} style={{ scale }}>
      <Head>
        <title>Homepage</title>
        <meta name="homepage" />
      </Head>
      <Hero />
      <VideoAd />
      <HorizontalMarquee />
      {/* <FeaturedCollection data={featuredCollections} />
      <RareToFind data={rareToFind} />
      <Testimonials />
      <SlideShow />
      <FeaturedProduct featuredProduct={featuredProduct} />
      <FeaturedGrid />
      <OurBlog />*/}
    </MotionParent>
  );
};

export default HomePage;
