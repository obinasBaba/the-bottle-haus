import { Badge, Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useCart } from '@/SWRHooksAPI';
import Link from 'next/link';
import { useAppInfo } from '@/context/MotionValuesContext';
import s from './checkoutpage.module.scss';
import { motion } from 'framer-motion';
import { FancyInput } from '@/scenes/CheckoutPage/FancyInput';

export function CartInfo(props: any) {
  const cart = useCart();

  const { toolTipsData } = useAppInfo();

  return (
    <motion.div className={s.cart_info} layout>
      <header className="hor">
        <h2> {cart?.data?.lineItems.length || 0} item</h2>
        <Link href="/cart" aria-label="to cart">
          <a>
            <Button data-cursor="-opaque">edit</Button>
          </a>
        </Link>
      </header>

      <div className="cart_list_wrapper">
        <div className="cart_list_bottom_gradient" />

        <div className="cart_list" tabIndex={1}>
          {cart.data?.lineItems.map(
            ({
              id,
              name,
              quantity,
              variant: {
                price,
                product: { media },
              },
            }) => (
              <div className="item" key={id}>
                <div className="img">
                  <Badge invisible={quantity == 1} badgeContent={quantity} color="primary">
                    <div className="img_wrapper">
                      <Image
                        src={(media && media[0]?.url) || ''}
                        alt="bottle"
                        layout="fixed"
                        width="55px"
                        height="55px"
                        objectFit="contain"
                      />
                    </div>
                  </Badge>
                </div>
                <div className="ver">
                  <p className="price">${price}</p>
                  <p className="name">{name}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="btns">
        <FancyInput
          size="small"
          label="Gift card or discount code"
          disabled={props.processingPayment}
        />
      </div>

      <div className="detail">
        <div className="item">
          <p>Subtotal</p>23.2
          <h4>${cart.data?.totalPrice || '-'}</h4>
        </div>
        <div className="item">
          <p>Shipping</p>
          <h4>${cart.data?.lineItems?.length && cart.data?.lineItems?.length > 0 ? 15.2 : '-'}</h4>
        </div>
        <div className="item">
          <p>Taxes</p>
          <h4>$ -</h4>
        </div>

        <hr />

        <div className="item">
          <h4>Total to pay</h4>
          <h2>$ {cart.data?.totalPrice ? cart.data?.totalPrice + 15.2 : '-'} </h2>
        </div>
      </div>
    </motion.div>
  );
}
