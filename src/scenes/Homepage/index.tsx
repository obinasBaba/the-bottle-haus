import React from 'react';
import Head from 'next/head';
import s from './homepage.module.scss';
import Hero from './Hero';
import Testimonials from './/OtherSaying';
import OurBlog from './/OurBlog';
import { Product, ProductTypes } from '@/types/product';
import { PageTransitionContainer } from '@/components/common/MotionItems';
import HorizontalMarquee from './/HorizontalMarqee';
import GlassView from '@/scenes/Homepage/GlassView';
import FeaturedCollection from '@/scenes/Homepage/FeaturedCollection';
import RareToFind from '@/scenes/Homepage/RareToFind';

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
  return (
    <PageTransitionContainer transition={pageTransition} className={s.container}>
      <Head>
        <title>Juvi . Homepage</title>
        <meta name="homepage" />
      </Head>
      <Hero />
      <HorizontalMarquee />
      <GlassView />
      <FeaturedCollection data={featuredCollections} />
      <RareToFind data={rareToFind} />
      <Testimonials />
      {/*<FeaturedProduct featuredProduct={featuredProduct} />
      <FeaturedGrid />*/}
      <OurBlog />
    </PageTransitionContainer>
  );
};

export default HomePage;
