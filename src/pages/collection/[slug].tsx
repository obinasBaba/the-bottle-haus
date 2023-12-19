import React from 'react';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import CollectionPage from '@/scenes/CollectionPage';
import CollectionLayout from '@/components/common/layout/CollectionLayout';
import { getCollectionProducts, getCollections } from '@lib/saleor';

export async function getStaticPaths({}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const collections = await getCollections();

  return {
    paths: collections.map(({ handle }) => ({ params: { slug: handle } })), // paths: ['boo'],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
  locale,
  preview,
  locales,
}: GetStaticPropsContext<any>) {
  const collections = await getCollections();

  const targetCollection = collections.find((coll) => coll.handle === params.slug);

  const products = await getCollectionProducts({
    collection: targetCollection?.handle ?? 'collections-not-found',
  });

  return {
    props: {
      sideNav: true,
      collections,
      collectionName: targetCollection!.title,
      products,
    }, // revalidate: 200,
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
