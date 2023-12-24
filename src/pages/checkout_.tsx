import React from 'react';
import CheckoutPage from '@/scenes/CheckoutPage';
import { MotionParent } from '@/components/common/MotionItems';
import Head from 'next/head';
import { pageTransition } from '@/scenes/Homepage';

const Checkout = () => {
  return (
    <MotionParent variants={{}} transition={pageTransition}>
      <Head>
        <title>checkout</title>
        <meta name="Juvi . Checkout " />
      </Head>
      <CheckoutPage />
    </MotionParent>
  );
};

export default Checkout;
