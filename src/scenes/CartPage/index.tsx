import CartProductList from '@/scenes/CartPage/CartProductList';
import PaymentGateways from '@/scenes/CartPage/PaymentGateways';
import Image from 'next/image';
import s from './cartpage.module.scss';
import CartBg from '@/public/image 62.png';
import { Cart } from '@lib/types';
import React from 'react';
import Quantity from '@/scenes/CartPage/CartProductList/Quantity';

type Props = {
  cart?: Cart;
};


const CartPage = ({ cart }: Props) => {
  return (
    <div className={s.container} id="cart-page">
      <div
        className={s.cart_bg}
        data-scroll={true}
        data-scroll-sticky={true}
        data-scroll-target={'#cart-page'}>
        <div>
          <Image src={CartBg} alt="cart background art" />
        </div>
      </div>

      <div className={s.wrapper}>
        <CartProductList cart={cart} />
        <PaymentGateways cart={cart} />
      </div>
    </div>
  );
};

export default CartPage;
