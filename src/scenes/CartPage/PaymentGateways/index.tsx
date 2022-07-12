import React from 'react';
import s from './paymentgateways.module.scss';
import { TextField } from '@mui/material';
import ShipmentProtection from './img.png';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';

const PaymentGateways = () => {
  return (
    <div className={s.container}>
      <div className="payment_wrapper">
        <div className="message">
          <h3>Special instruction for the saleor</h3>
          <TextField variant="outlined" fullWidth multiline rows={5} label="message" />
        </div>
        <div className="payments_detail">
          <div className="total">
            <h3>SUBTOTAL</h3>
            <h2>$64.988</h2>
          </div>

          <p>Taxes And Shipping Are Calculated At Checkout</p>

          <div className="hor">
            <input type="checkbox" />

            <div className="protect">
              <div className="shipment_img">
                <Image src={ShipmentProtection} alt="shipment-icon" />
              </div>
              <div className="ver">
                <h4>Shipping Protection</h4>
                <small>from Damage, Loss & Theft $4.44</small>
                <Link href="/">
                  <a>
                    <small className="detail">View Detail</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <p>
            <sup>*</sup> By Deselecting shipping protection, the bottle hause is not liable for
            items lost, damaged, or stolen in transit
          </p>

          <div className="payment_btns">
            <Link href="/checkout">
              <a>
                <Button text="Check Out" />
              </a>
            </Link>
            <hr />
            <div className="methods">
              <Button text="Paypal" />
              <Button text="Shop Pay" />
              <Button text="G Pay" />
              <Button text="Check Out" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateways;
