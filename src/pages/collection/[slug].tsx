import React from 'react';
import CollectionPage from '@/scenes/CollectionPage';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import commerce from '@lib/api/commerce';

export async function getStaticProps({
  params,
  locale,
  preview,
  locales,
}: GetStaticPropsContext<any>) {
  const config = { locale, locales };

  const { collections } = await commerce.getSiteInfo({ config, preview });
  const targetCollection = collections.find((coll) => coll.slug === params.slug);

  if (!targetCollection) throw new Error('you messed up with the slug: ', params.slug);

  const products = await commerce.getAllProducts({
    variables: {
      first: 9,
      filter: {
        collections: [targetCollection.id],
      },
    },
  });

  return {
    props: {
      sideNav: true,
      collections,
      collectionName: targetCollection.name,
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

const Collections: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ products }) => {
  return <CollectionPage products={products} />;
};

export default Collections;
