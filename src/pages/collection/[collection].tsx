import React from 'react';
import CollectionPage from '@/scenes/CollectionPage';
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext } from 'next';

export async function getStaticProps({ params, locale }: GetStaticPropsContext<any>) {
  return {
    props: {
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
