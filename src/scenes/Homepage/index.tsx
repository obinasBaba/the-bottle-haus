import React, { useLayoutEffect } from 'react';
import Head from 'next/head';
import s from './homepage.module.scss';
import Hero from './Hero';
import OtherSaying from './/OtherSaying';
import OurBlog from './/OurBlog';
import { Product, ProductTypes } from '@/types/product';
import { PageTransitionContainer } from '@/components/common/MotionItems';
import HorizontalMarquee from './/HorizontalMarqee';
import GlassView from '@/scenes/Homepage/GlassView';
import FeaturedCollection from '@/scenes/Homepage/FeaturedCollection';
import RareToFind from '@/scenes/Homepage/RareToFind';
import FeaturedGrid from '@/scenes/Homepage/FeaturedGrid';
import FeaturedProduct from '@/scenes/Homepage/FeaturedProduct';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { useAppInfo } from '@/context/MotionValuesContext';

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
  const { scroll, cursor, y } = useLocomotiveScroll();
  const { scrollState } = useAppInfo();

  useLayoutEffect(() => {
    // cursor.current?.removeText();
    // cursor.current?.removeState('opaque');
    console.log('homepage scroll state: ', scrollState.get());

    if (scrollState.get() !== null && scrollState.get()?.remember) {
      scroll?.scrollTo(scrollState.get()?.scrollY || 0, { duration: 0 });
    }

    scrollState.set({ ...scrollState.get(), remember: false });
  }, []);

  return (
    <PageTransitionContainer
      transition={pageTransition}
      className={s.container}
      onAnimationComplete={(state: any) => {
        console.log('on animation complete', state);

        if (state === 'exit') {
          console.log('y :: ', y.get());
          scrollState.set({ ...scrollState.get(), scrollY: y.get() });
        }
      }}>
      <Head>
        <title>Juvi . Homepage</title>
        <meta name="homepage" />
      </Head>
      <Hero />
      <HorizontalMarquee />
      <GlassView />
      <FeaturedCollection data={featuredCollections} />
      <RareToFind data={rareToFind} />
      <OtherSaying />
      <FeaturedProduct featuredProduct={featuredProduct} />
      <FeaturedGrid />
      <OurBlog />
    </PageTransitionContainer>
  );
};

export default HomePage;
