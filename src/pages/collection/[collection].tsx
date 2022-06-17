import React from 'react';
import CollectionPage from '@/scenes/CollectionPage';
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext } from 'next';
import commerce from '@lib/api/commerce';

export async function getStaticProps({
  params,
  locale,
  preview,
  locales,
}: GetStaticPropsContext<any>) {
  const config = { locale, locales };

  const { collections } = await commerce.getSiteInfo({ config, preview });

  return {
    props: {
      collections,
      sideNav: true,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  return {
    paths: [{ params: { collection: 'boo' } }],
    // paths: ['boo'],
    fallback: false,
  };
}

const Collections = () => {
  return <CollectionPage />;
};

export default Collections;
