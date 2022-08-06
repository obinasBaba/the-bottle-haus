import React from 'react';
import s from './contactinformation.module.scss';
import { Button, FormControlLabel, Radio, TextField } from '@mui/material';
import { CheckoutFormStepComponent, StepScaffold } from '@/scenes/CheckoutPage';
import { Field } from 'formik';

const ContactInformation: CheckoutFormStepComponent = ({ controller }) => {
  return (
    <StepScaffold prevStep={controller.prevStep}>
      <div className={s.container}>
        <header>
          <Button variant="contained">1</Button>
          <h3>Contact Information</h3>
        </header>

        <div className="hor">
          <Field
            as={TextField}
            name="first_name"
            label="first name"
            type="text"
            variant="outlined"
          />
          <Field as={TextField} name="last_name" label="last name" type="text" variant="outlined" />
        </div>

        <Field as={TextField} required name="email" label="Email" type="text" variant="outlined" />

        <FormControlLabel control={<Radio />} label="notify me on updates" />
      </div>
    </StepScaffold>
  );
};

export default ContactInformation;
