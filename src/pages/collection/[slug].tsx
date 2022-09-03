import React, { FC, useState } from 'react';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import commerce from '@lib/api/commerce';
import { MotionParent } from '@/components/common/MotionItems';
import Head from 'next/head';
import { motion, MotionValue, useMotionValue } from 'framer-motion';
import { pageTransition } from '@/scenes/Homepage';
import CollectionPage from '@/scenes/CollectionPage';
import CollectionSideNav from '@/components/common/CollectionScaffold/CollectionSideNav';
import CollectionsFilterHeader from '@/components/common/CollectionScaffold/CollectionsFilter';
import s from '@/scenes/CollectionPage/collectionpage.module.scss';
import Image from 'next/image';

import RightTop from '@/scenes/CollectionPage/top-right.png';
import LeftBottom from '@/scenes/CollectionPage/bottom-left.png';

export const CollectionsContext = React.createContext<any>({});

const CollectionsProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [sortInfo, setSortInfo] = useState<any>({ refreshId: 0 });

  return <CollectionsContext.Provider value={{ sortInfo, setSortInfo }} {...props} />;
};

export async function getStaticProps({
  params,
  locale,
  preview,
  locales,
}: GetStaticPropsContext<any>) {
  const config = { locale, locales };

  const { collections } = await commerce.getSiteInfo({ config, preview });
  const targetCollection = collections.find((coll) => coll.slug === params.slug);

  // if (!targetCollection) throw new Error('you messed up with the slug: ', params.slug);

  const products = await commerce.getAllProducts({
    variables: {
      first: 100,
      filter: {
        collections: [targetCollection!.id],
      },
    },
  });

  return {
    props: {
      sideNav: true,
      collections,
      collectionName: targetCollection!.name,
      products,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const { collections } = await commerce.getSiteInfo({});

  return {
    paths: collections.slice(0, 1).map(({ slug }) => ({ params: { slug } })), // paths: ['boo'],
    fallback: 'blocking',
  };
}

const rf = new MotionValue<Record<string, any>>();

const Collections: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  products = [],
}) => {
  return (
    <>
      <CollectionPage products={products} rf={rf} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Collections.Layout = ({ children, collections, collectionName }: any) => {
  const scrolledTop = useMotionValue(true);

  return (
    <CollectionsProvider>
      <MotionParent
        className={s.layout_container}
        transition={pageTransition}
        id="layout-container">
        <Head>
          <title>Juvi . Collections</title>
          <meta name="collections page" />
        </Head>


        <div className={s.left}>
          <Image src={RightTop} objectFit="cover" alt="right-top art image" />
        </div>

        <div
          className={s.coll_bg}
          data-scroll={true}
          data-scroll-sticky={true}
          data-scroll-target="#layout-container">

          <div className={s.right}
               data-scroll={true}
               data-scroll-speed='1'
               data-scroll-delay='.03'
          >
            <Image src={LeftBottom} objectFit="cover" alt="left-bottom art image" />
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
            <CollectionsFilterHeader title={collectionName} key={collectionName} rf={rf} />

            {children}
          </motion.main>
        </div>
      </MotionParent>
    </CollectionsProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Collections.Layout.displayName = 'CollectionLayout';

export default Collections;
