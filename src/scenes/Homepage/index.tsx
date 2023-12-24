'use client';

import s from './homepage.module.scss';
import Hero from './Hero';
import OtherSaying from './/OtherSaying';
import OurBlog from './/OurBlog';
import { PageTransitionContainer } from '@/components/common/MotionItems';
import HorizontalMarquee from './/HorizontalMarqee';
import GlassView from '@/scenes/Homepage/GlassView';
import FeaturedCollection from '@/scenes/Homepage/FeaturedCollection';
import RareToFind from '@/scenes/Homepage/RareToFind';
import FeaturedGrid from '@/scenes/Homepage/FeaturedGrid';
import FeaturedProduct from '@/scenes/Homepage/FeaturedProduct';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { useAppInfo } from '@/context/MotionValuesContext';

import { Product as JuviProduct } from '@/lib/types';
import { useLayoutEffect } from 'react';

type HomepageProps = {
  featuredProduct: JuviProduct;
  featuredCollections: JuviProduct[];
  rareToFind: JuviProduct[];
};

export const pageTransition = {
  duration: 2.5,
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
    cursor.current?.removeText();
    cursor.current?.removeState('opaque');
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
        if (state === 'exit') {
          scrollState.set({ ...scrollState.get(), scrollY: y.get() });
        }
      }}>
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
