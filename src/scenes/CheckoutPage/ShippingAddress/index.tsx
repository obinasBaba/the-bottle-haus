import React from 'react';
import s from './shippingaddress.module.scss';
import { Button, TextField } from '@mui/material';
import { CheckoutFormStepComponent, StepScaffold } from '@/scenes/CheckoutPage';
import { Field } from 'formik';

const ShippingAddress: CheckoutFormStepComponent = ({ controller }) => {
  return (
    <StepScaffold prevStep={controller.prevStep}>
      <div className={s.container}>
        <header>
          <Button variant="contained">2</Button>
          <h3>Shipping address</h3>
        </header>

        <div className="hor">
          <TextField name="First-name" label="first name" type="text" variant="outlined" />
          <TextField name="Last-name" label="last name" type="text" variant="outlined" />
        </div>

        <Field
          as={TextField}
          name="address"
          required
          label="Address"
          type="text"
          variant="outlined"
        />

        <TextField
          name="apartment"
          label="Apartment, suite, etc(optional)"
          type="text"
          variant="outlined"
        />

        <TextField name="city" label="City" type="text" variant="outlined" />

        <div className="hor">
          <TextField
            name="country"
            label="Country"
            type="text"
            variant="outlined"
            placeholder="ethiopia"
          />
          <TextField name="state" label="State" type="text" variant="outlined" />
          <TextField name="zipcode" label="ZIP code" type="number" variant="outlined" />
        </div>

        <TextField
          name="phone"
          label="phoneNo for updates and exclusive offers"
          type="number"
          variant="outlined"
        />
      </div>
    </StepScaffold>
  );
};

export default ShippingAddress;
