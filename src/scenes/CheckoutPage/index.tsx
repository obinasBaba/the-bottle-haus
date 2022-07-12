import React from 'react';
import s from './checkoutpage.module.scss';
import { Button, TextField } from '@mui/material';

const steps = [];

const CheckoutPage = () => {
  return (
    <div className={s.container}>
      <div className="ver">
        <h1>Checkout Detail</h1>
        <div className="active_step"></div>
      </div>

      <div className="checkout_detail">
        <div className="step_info">
          <div className="completed_steps">
            <Button>1</Button>
            <div className="text">
              <h3>Contact information</h3>
              <small className="sub_title">John Clayes (acount@gmail.com)</small>
            </div>
          </div>
        </div>

        <div className="cart_info">
          <header className="hor">
            <h2>1 item</h2>
            <p>EDIT</p>
          </header>

          <div className="list"></div>

          <div className="btns">
            <TextField label="Gift card or discount code" />
            <Button>Apply</Button>
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
      </div>
    </div>
  );
};

export default CheckoutPage;
