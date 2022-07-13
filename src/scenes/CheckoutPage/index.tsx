import React, { useState } from 'react';
import { Badge, Button, IconButton, InputAdornment, TextField } from '@mui/material';

import Bottle from '@/public/whisky-review/kiss.png';
import Image from 'next/image';
import MotionWrapper from '@/components/common/MotionWrapper';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Form, Formik, FormikProps } from 'formik';
import ContactInformation from '@/scenes/CheckoutPage/ContactInformation';
import ShippingMethod from '@/scenes/CheckoutPage/ShippingMethod';
import ShippingAddress from '@/scenes/CheckoutPage/ShippingAddress';
import Payment from '@/scenes/CheckoutPage/Payment';
import s from './checkoutpage.module.scss';
import { CheckCircle } from '@mui/icons-material';

const wrapperVariants = {
  initial: {
    opacity: 0,
    scale: 0.87,
    y: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    // scale: 0.92,
  },
};

const steps = [
  {
    name: 'account-info',
    component: (props: any) => <ContactInformation {...props} />,
  },
  {
    name: 'shipping-address',
    component: (props: any) => <ShippingAddress {...props} />,
  },
  {
    name: 'shipping-method',
    component: (props: any) => <ShippingMethod {...props} />,
  },
  {
    name: 'payment',
    component: (props: any) => <Payment {...props} />,
  },
];

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  shipment: '',
  address: '',
};

type CheckoutFormStepArgType = {
  children?: React.ReactNode;
  formikProps: FormikProps<typeof initialValues>;
} & Record<string, any>;

export type CheckoutFormStepComponent = React.FC<CheckoutFormStepArgType>;

export const StepScaffold = ({ children, prevStep }: any) => {
  return (
    <div className={s.scaffold}>
      {children}

      <div className="hor bottom_controller">
        <Button
          variant="outlined"
          className="in_btn"
          size="large"
          color="primary"
          onClick={() => prevStep()}>
          Back
        </Button>

        <Button
          variant="contained"
          size="large"
          // className={clsx([{ [s.alone]: idx === 0 }])}
          type="submit"
          // onClick={() => nextStep()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

const CompletedSteps = ({ stepNo, completed, name, subtitle }: any) => {
  console.log('completd: ', completed);
  return (
    <div className="completed_step">
      <div className="step_indicator">
        {!completed ? (
          <Button color="secondary" variant="text" className="step_no">
            1
          </Button>
        ) : (
          <IconButton color="primary">
            <CheckCircle />
          </IconButton>
        )}
      </div>
      <div className="text">
        <h3>Contact information</h3>
        <small className="sub_title">John Clayes (acount@gmail.com)</small>
      </div>
      <Button variant="outlined">EDIT</Button>
    </div>
  );
};

const CheckoutPage = () => {
  const [idx, setIdx] = useState(0);
  const [completed, pushCompleted] = useState<{ completed: boolean; idx: number }[]>([
    { completed: false, idx: 0 },
  ]);
  const [activeStep, setActiveStep] = useState<typeof steps[number]>({
    ...steps[idx],
  });

  const nextStep = (arg: any) => {
    console.log('next step', arg);

    if (!arg) return;

    setActiveStep(steps[idx + 1]);
    setIdx(idx + 1);
    pushCompleted([
      ...completed.slice(0, completed.length - 1),
      { completed: true, idx },
      { completed: false, idx: idx + 1 },
    ]);
  };

  const prevStep = () => {
    setActiveStep(steps[idx - 1]);
    setIdx(idx - 1);
    pushCompleted((prev) =>
      prev.map((item) => (item.idx == idx - 1 ? { ...item, completed: false } : item)),
    );
  };

  const setStep = (n: number) => {
    setActiveStep(steps[n]);
  };

  return (
    <div className={s.container}>
      <div className="wrapper">
        <div className="checkout_form">
          <h1>
            Checkout <span>Detail</span>
          </h1>
          <MotionWrapper className="active_step">
            <Formik
              initialValues={initialValues}
              validateOnMount={false}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={nextStep}
              // validationSchema={activeStep.schema}
            >
              {(formikProps) => (
                <Form>
                  <LayoutGroup>
                    <AnimatePresence exitBeforeEnter>
                      <motion.div
                        className="animator"
                        variants={wrapperVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={activeStep.name}
                        layout>
                        {activeStep.component({
                          controller: { nextStep, prevStep, setStep },
                          formikProps,
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </LayoutGroup>
                </Form>
              )}
            </Formik>
          </MotionWrapper>
        </div>

        <div className="checkout_detail">
          <div className="step_info">
            {completed.map(({ completed }, idx) => (
              <CompletedSteps key={idx} completed={completed} />
            ))}
          </div>

          <div className="cart_info">
            <header className="hor">
              <h2>1 item</h2>
              <Button>EDIT</Button>
            </header>

            <div className="list">
              <div className="item">
                <div className="img">
                  <Badge badgeContent={4} color="primary">
                    <div className="img_wrapper">
                      <Image src={Bottle} alt="bottle" />
                    </div>
                  </Badge>
                </div>
                <div className="ver">
                  <h2 className="price">$23.43</h2>
                  <p className="name">Balcone brimsone textas scrub oak smoked whisky 323ml</p>
                </div>
              </div>
            </div>

            <div className="btns">
              <div className="input">
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Gift card or discount code"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button variant="contained" size="large">
                          Apply
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
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
    </div>
  );
};

export default CheckoutPage;
