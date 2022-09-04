import React from 'react';
import CartPage from '@/scenes/CartPage';
import { GetStaticPropsContext } from 'next';
import commerce from '@lib/api/commerce';
import { MotionParent } from '@/components/common/MotionItems';
import Head from 'next/head';
import { pageTransition } from '@/scenes/Homepage';


const Cart = () => {
  return (
    <MotionParent transition={pageTransition}>
      <Head>
        <title>Juvi . Cart</title>
        <meta name="cart page" />
      </Head>
      <CartPage />
    </MotionParent>
  );
};

export default Cart;
