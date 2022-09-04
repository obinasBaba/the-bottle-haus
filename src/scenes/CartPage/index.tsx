import React from 'react';
import CartProductList from '@/scenes/CartPage/CartProductList';
import PaymentGateways from '@/scenes/CartPage/PaymentGateways';
import s from './cartpage.module.scss';


const CartPage = () => {
  return (
    <div className={s.container}>

      <div className={s.wrapper}  >
        <CartProductList />
        <PaymentGateways />
      </div>


    </div>
  );
};

export default CartPage;
