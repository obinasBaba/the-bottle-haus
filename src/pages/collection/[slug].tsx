import React, { FC, useState } from 'react';
import CollectionPage from '@/scenes/CollectionPage';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import commerce from '@lib/api/commerce';
import { MotionParent } from '@/components/common/MotionItems';
import Head from 'next/head';
import { MotionValue } from 'framer-motion';
import { pageTransition } from '@/scenes/Homepage';
import s from '@/scenes/CollectionPage/collectionpage.module.scss';
import CollectionSideNav from '@/components/common/CollectionScaffold/CollectionSideNav';
import CollectionsFilterHeader from '@/components/common/CollectionScaffold/CollectionsFilter';

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
    paths: collections.map(({ slug }) => ({ params: { slug } })),
    // paths: ['boo'],
    fallback: false,
  };
}

const rf = new MotionValue<Record<string, any>>();

const Collections: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  products = [],
}) => {
  return (
    <MotionParent transition={pageTransition}>
      <Head>
        <title>collections</title>
        <meta name="collections page" />
      </Head>
      <CollectionPage products={products} rf={rf} />
    </MotionParent>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Collections.Layout = ({ children, collections, collectionName }: any) => {
  return (
    <CollectionsProvider>
      <div className={s.layout_container}>
        <CollectionSideNav collections={collections} />

        <main className={s.main} id="fixed-target">
          <CollectionsFilterHeader title={collectionName} key={collectionName} rf={rf} />

          {children}
        </main>
      </div>
    </CollectionsProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Collections.Layout.displayName = 'Layout';

export default Collections;
