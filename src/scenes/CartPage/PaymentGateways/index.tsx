'use client';


import React from 'react';
import s from './paymentgateways.module.scss';
import { Button, Checkbox, TextField, Typography } from '@mui/material';
import ShipmentProtection from '@/public/truck.png';
import Image from 'next/image';
import Payments from '@/public/payments.png';
import { motion } from 'framer-motion';

import Link from 'next/link';
import { Cart } from '@lib/types';

type Props = {
  cart?: Cart;
};

const PaymentGateways = ({ cart }: Props) => {
  const [checked, setChecked] = React.useState(false);

  // const { data: cart } = useCart();

  return (
    <motion.div
      className={s.container}
      variants={{}}
      data-scroll={true}
      data-scroll-target="#cart-product-wrapperz"
      data-scroll-offset="0%, 90px"
      data-scroll-sticky={true}>
      <div className="payment_wrapper">
        <div className="message">
          <h3>Special instruction for the saleor</h3>
          <TextField variant="outlined" fullWidth multiline rows={3} label="message" />
        </div>

        <div className="payments_detail">
          <div className="total">
            <h3>SUBTOTAL</h3>
            <h2>${cart?.cost.subtotalAmount.amount || 0} </h2>
          </div>

          <p>Taxes And Shipping Are Calculated At Checkout</p>

          <div className="hor" onClick={() => setChecked(!checked)}>
            <Checkbox
              checked={checked}
              // onChange={handleChange1}
            />

            <div className="protect">
              <div className="shipment_img">
                <Image src={ShipmentProtection} alt="shipment-icon" />
              </div>
              <div className="ver">
                <h4>Shipping Protection</h4>
                <small>from Damage, Loss & Theft $4.44</small>
                <Link href="/cart">
                  <small className="detail">View Detail</small>
                </Link>
              </div>
            </div>
          </div>

          <Typography variant="body2">
            <sup>*</sup> By Deselecting shipping protection, the bottle hause is not liable for
            items lost, damaged, or stolen in transit
          </Typography>

          <div className="payment_btns">
            <Link href="/checkout">
              <Button size="large" variant="contained" data-cursor="-opaque">
                Check Out
              </Button>
            </Link>
            <hr />
            <div className="methods">
              <Image src={Payments} alt="payment methods" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentGateways;
