import React from 'react';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import commerce from '@lib/api/commerce';
import { MotionValue } from 'framer-motion';
import CollectionPage from '@/scenes/CollectionPage';
import CollectionLayout from '@/components/common/layout/CollectionLayout';

export async function getStaticPaths({}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const { collections } = await commerce.getSiteInfo({});

  return {
    paths: collections.map(({ slug }) => ({ params: { slug } })), // paths: ['boo'],
    fallback: 'blocking',
  };
}

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
    // revalidate: 200,
  };
}

const Collections: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  products = [],
}) => {
  return (
    <>
      <CollectionPage products={products} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Collections.Layout = CollectionLayout;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Collections.Layout.displayName = 'CollectionLayout';

export default Collections;
