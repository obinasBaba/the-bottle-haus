import React from 'react';
import CheckoutPage from '@/scenes/CheckoutPage';
import { GetStaticPropsContext } from 'next';
import commerce from '@lib/api/commerce';

export async function getStaticProps(arg: GetStaticPropsContext) {
  const allCollections = await commerce.getSiteInfo({});

  return {
    props: {
      collections: allCollections.collections,
    },
    revalidate: 60,
  };
}

const Checkout = () => {
  return <CheckoutPage />;
};

export default Checkout;
