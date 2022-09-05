import React from 'react';
import s from './collectionlayout.module.scss';
import { motion, useMotionValue } from 'framer-motion';
import { MotionParent } from '@/components/common/MotionItems';
import { pageTransition } from '@/scenes/Homepage';
import Head from 'next/head';
import Image from 'next/image';
import RightTop from '@/scenes/CollectionPage/top-right.png';
import RightBottom from '@/scenes/CollectionPage/bottom-left.png';
import CollectionSideNav from '@/components/common/CollectionScaffold/CollectionSideNav';
import CollectionsFilterHeader from '@/components/common/CollectionScaffold/CollectionsFilter';
import CollectionsProvider from '@/context/CollectionPageContext';

const leftGrapeVariants = {
  initial: {
    opacity: 0,
    y: '-70%',
  },
  animate: {
    opacity: 1,
    y: '0%',
  },
  exit: {
    opacity: 0,
    y: '-70%',
  },
};

const rightGrapeVariants = {
  initial: {
    opacity: 0,
    x: '70%',
  },
  animate: {
    opacity: 1,
    x: '0%',
  },
  exit: {
    opacity: 0,
    x: '70%',
  },
};

const CollectionLayout = ({ children, collections, collectionName }: any) => {
  const scrolledTop = useMotionValue(true);

  return (
    <CollectionsProvider>
      <MotionParent
        className={s.container}
        transition={{ ...pageTransition, filter: 'blur(15px)' }}
        id="layout-container">
        <Head>
          <title>Juvi . Collections</title>
          <meta name="collections page" />
        </Head>

        <motion.div
          className={s.left}
          variants={leftGrapeVariants}
          transition={{ ...pageTransition, delay: 1 }}>
          <Image src={RightTop} objectFit="cover" alt="right-top art image" />
        </motion.div>

        <div
          className={s.coll_bg}
          data-scroll={true}
          data-scroll-sticky={true}
          data-scroll-target="#layout-container">
          <div className={s.right} data-scroll={true} data-scroll-speed="1" data-scroll-delay=".03">
            <motion.div variants={rightGrapeVariants} transition={{ ...pageTransition, delay: 1 }}>
              <Image src={RightBottom} objectFit="cover" alt="left-bottom art image" />
            </motion.div>
          </div>
        </div>

        <div className={s.wrapper}>
          <motion.div
            className={s.scroll_trigger}
            onViewportEnter={(entry) => scrolledTop.set(true)}
            onViewportLeave={(event) => scrolledTop.set(false)}
          />

          <CollectionSideNav collections={collections} scrolledTop={scrolledTop} />

          <motion.main className={s.coll_main} id="fixed-target">
            <CollectionsFilterHeader title={collectionName} key={collectionName} />

            {children}
          </motion.main>
        </div>
      </MotionParent>
    </CollectionsProvider>
  );
};

export default CollectionLayout;
