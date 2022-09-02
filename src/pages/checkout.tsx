import React from 'react';
import CheckoutPage from '@/scenes/CheckoutPage';
import { GetStaticPropsContext } from 'next';
import commerce from '@lib/api/commerce';
import { MotionParent } from '@/components/common/MotionItems';
import Head from 'next/head';
import { pageTransition } from '@/scenes/Homepage';

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
  return (
    <MotionParent transition={pageTransition}>
      <Head>
        <title>checkout</title>
        <meta name="Juvi . Checkout " />
      </Head>
      <CheckoutPage />
    </MotionParent>
  );
};

export default Checkout;
