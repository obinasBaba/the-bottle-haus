import React from 'react';
import CartPage from '@/scenes/CartPage';
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

const Cart = () => {
  return <CartPage />;
};

export default Cart;
