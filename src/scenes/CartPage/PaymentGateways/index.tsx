import React from 'react';
import s from './paymentgateways.module.scss';
import { Button, Checkbox, TextField } from '@mui/material';
import ShipmentProtection from './img.png';
import Image from 'next/image';
import Payments from './payments.png';

import Link from 'next/link';

const PaymentGateways = () => {
  const [checked, setChecked] = React.useState(false);

  return (<div className={s.container}>
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
                <Button size="large" variant="contained">
                  Check Out
                </Button>
              </a>
            </Link>
            <hr />
            <div className="methods">
              <Image src={Payments} />

              {/*  <Button size="large" variant="outlined">
                Paypal
              </Button>
              <Button size="large" variant="outlined">
                Shop Pay
              </Button>
              <Button size="large" variant="outlined">
                G Pay
              </Button>
              <Button size="large" variant="outlined">
                Check Out
              </Button>*/}
            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default PaymentGateways;
