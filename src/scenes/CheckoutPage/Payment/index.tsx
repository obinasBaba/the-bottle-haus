import React from 'react';
import s from './payment.module.scss';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Image from 'next/image';
import Paypal from '@/public/paypal.svg';
import Discover from '@/public/discover.svg';
import MasterCard from '@/public/mastercard.svg';
import { CheckoutFormStepComponent, StepScaffold } from '@/scenes/CheckoutPage';
import { Field } from 'formik';

const Payment: CheckoutFormStepComponent = ({ controller, controller: { currentIdx } }) => {
  return (
    <StepScaffold prevStep={controller.prevStep} idx={currentIdx}>
      <div className={s.container}>
        <header>
          <Button variant="contained">4</Button>
          <h3>Payment</h3>
        </header>
        <p>
          <sup>*</sup>All transaction are secure and encrypted
        </p>

        <div className="ver">
          <div className="hor">
            <FormControlLabel control={<Radio />} label="Credit card" />
            <div className="hor">
              <Image src={Paypal} alt="paypal" />
              <Image src={Discover} alt="discover" />
              <Image src={MasterCard} alt="mastercard" />
            </div>
          </div>

          <Field
            as={TextField}
            required
            name="card_number"
            label="Card number"
            type="number"
            variant="outlined"
          />
          <Field
            as={TextField}
            required
            name="card_name"
            label="Name on card"
            type="text"
            variant="outlined"
          />

          <div className="hor">
            <Field
              as={TextField}
              required
              name="card_expire"
              label="expire date"
              type="number"
              variant="outlined"
            />
            <Field
              as={TextField}
              required
              name="card_code"
              label="Security code"
              type="number"
              variant="outlined"
            />
          </div>
        </div>

        <div className="title">
          <h3>Billing address</h3>
          <small>
            <sup>*</sup>Select the address that matches you card for payment method
          </small>
        </div>

        <RadioGroup>
          <FormControlLabel control={<Radio />} label="Same as shipping address" />
          <FormControlLabel control={<Radio />} label="Use a different billing address" />
        </RadioGroup>
      </div>
    </StepScaffold>
  );
};

export default Payment;