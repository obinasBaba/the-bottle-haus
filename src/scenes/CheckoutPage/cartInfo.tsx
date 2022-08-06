import { Badge, Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { FancyInput } from '@/scenes/CheckoutPage/index';
import { useCart } from '@/SWRHooksAPI';
import Link from 'next/link';
import { useAppInfo } from '@/context/MotionValuesContext';

export function CartInfo() {
  const cart = useCart();

  const { toolTipsData } = useAppInfo();

  return (
    <div className="cart_info">
      <header className="hor">
        <h2> {cart?.data?.lineItems.length || 0} item</h2>
        <Link href="/cart" aria-label="to cart">
          <Button>EDIT</Button>
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
                  <h2 className="price">${price}</h2>
                  <p className="name">{name}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="btns">
        <FancyInput label="Gift card or discount code" />
      </div>

      <div className="detail">
        <div className="item">
          <p>Subtotal</p>
          <h4>$23.2</h4>
        </div>
        <div className="item">
          <p>Shipping</p>
          <h4>$3.2</h4>
        </div>
        <div className="item">
          <p>Taxes</p>
          <h4>$3.2</h4>
        </div>

        <div className="item">
          <h4>Total to pay</h4>
          <h1>$113.2</h1>
        </div>
      </div>
    </div>
  );
}
