import React from 'react';
import CartProductList from '@/scenes/CartPage/CartProductList';
import PaymentGateways from '@/scenes/CartPage/PaymentGateways';

const CartPage = () => {
  return (
    <>
      <CartProductList />
      <PaymentGateways />
    </>
  );
};

export default CartPage;
