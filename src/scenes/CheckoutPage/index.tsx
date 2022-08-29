import React, { useEffect, useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { MotionParent } from '@/components/common/MotionItems';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Form, Formik, FormikProps } from 'formik';
import ContactInformation from '@/scenes/CheckoutPage/ContactInformation';
import ShippingMethod from '@/scenes/CheckoutPage/ShippingMethod';
import ShippingAddress from '@/scenes/CheckoutPage/ShippingAddress';
import Payment from '@/scenes/CheckoutPage/Payment';
import s from './checkoutpage.module.scss';
import { CheckCircle } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAppInfo } from '@/context/MotionValuesContext';
import { FormikHelpers } from 'formik/dist/types';
import { CartInfo } from '@/scenes/CheckoutPage/cartInfo';

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
    name: 'Account Info',
    component: (props: any) => <ContactInformation {...props} />,
  },
  {
    name: 'Shipping Address',
    component: (props: any) => <ShippingAddress {...props} />,
  },
  {
    name: 'Shipping Method',
    component: (props: any) => <ShippingMethod {...props} />,
  },
  {
    name: 'Payment',
    component: (props: any) => <Payment {...props} />,
  },
];

export const StepScaffold = ({ children, prevStep, idx }: any) => {
  const router = useRouter();
  const [disable, setDisable] = useState(false);

  return (
    <div className={s.scaffold}>
      {children}

      <div className="hor bottom_controller">
        <Button
          variant="outlined"
          className="in_btn"
          size="large"
          color="primary"
          disabled={disable}
          onClick={() => (idx == 0 ? router.push('/cart') : prevStep())}>
          Back
        </Button>

        <Button
          variant="contained"
          size="large"
          // className={clsx([{ [s.alone]: idx === 0 }])}
          disabled={disable}
          type="submit"
          onClick={() => {
            if (idx == 3) {
              setTimeout(() => setDisable(true), 200);
            }
          }}>
          {idx == 3 ? 'Pay Now' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

const CompletedSteps = ({ stepNo, completed, name, data, idx }: any) => {
  return (
    <div className="completed_step">
      <div className="step_indicator">
        {completed && data ? (
          <IconButton color="primary">
            <CheckCircle />
          </IconButton>
        ) : (
          <Button color="secondary" variant="text" className="step_no">
            {idx}
          </Button>
        )}
      </div>
      <div className="text">
        <h3>{name}</h3>
        <small className="sub_title"> {data || ' --'} </small>
      </div>
      <Button size="small" variant="outlined">
        EDIT
      </Button>
    </div>
  );
};

export const FancyInput = ({ size = 'medium', btnText = 'apply', label = '' }: any) => {
  return (
    <div className="input">
      <TextField
        fullWidth
        type="text"
        size={size}
        variant="outlined"
        color="primary"
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="large">
                {btnText}
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  shipment: '',
  address: '',
  card_name: '',
  card_number: '',
};

type CheckoutFormStepArgType = {
  children?: React.ReactNode;
  formikProps: FormikProps<typeof initialValues>;
} & Record<string, any>;

export type CheckoutFormStepComponent = React.FC<CheckoutFormStepArgType>;

const CheckoutPage = () => {
  const [idx, setIdx] = useState(0);
  const [activeStep, setActiveStep] = useState<typeof steps[number]>(steps[idx]);
  const { toolTipsData } = useAppInfo();
  const [completed, pushCompleted] = useState<
    { completed: boolean; idx: number; name: string; data: string | null }[]
  >([
    {
      completed: false,
      idx: 0,
      name: activeStep.name,
      data: null,
    },
  ]);

  const getFormData = (idx: number, value: typeof initialValues) => {
    switch (idx) {
      case 0:
        return `${value.first_name} ${value.last_name} (${value.email}) `;
      case 1:
        return `${value.address} `;
      case 2:
        return `${value.shipment} `;
      default:
        return '';
    }
  };

  const nextStep = (value: typeof initialValues, helper: FormikHelpers<typeof initialValues>) => {
    if (!value) return;

    if (idx == steps.length - 1) {
      toolTipsData.set({
        closable: false,
        text: 'Processing Payment ....',
      });
    }

    const nextStep = steps[idx + 1];

    // push if not exist or update if exist
    if (completed.map(({ name }) => name).includes(nextStep.name)) {
      pushCompleted(
        completed.map((c, idx) => ({
          ...c,
          completed: c.name != nextStep.name && c.idx <= idx + 1,
        })),
      );
    } else {
      pushCompleted([
        ...completed.map((c, idx) => ({ ...c, data: getFormData(idx, value), completed: true })),
        {
          completed: false,
          idx: idx + 1,
          name: nextStep.name,
          data: null,
        },
      ]);
    }

    setIdx(idx + 1);
    setActiveStep(nextStep);
  };

  const prevStep = () => {
    if (idx === 0) return;
    setActiveStep(steps[idx - 1]);
    setIdx(idx - 1);
  };

  const setStep = (n: number) => {
    setActiveStep(steps[n]);
  };

  useEffect(() => {
    console.log('idsx :', idx);
  }, [idx]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        <div className="checkout_form">
          <h1>
            Checkout <span>Detail</span>
          </h1>
          <MotionParent className="active_step">
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
                          controller: { nextStep, prevStep, setStep, currentIdx: idx },
                          formikProps,
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </LayoutGroup>
                </Form>
              )}
            </Formik>
          </MotionParent>
        </div>

        <div className="checkout_detail">
          <div className="step_info">
            {completed.map(({ completed, name, data, idx }) => (
              <CompletedSteps
                key={idx}
                completed={completed}
                name={name}
                data={data}
                idx={idx + 1}
              />
            ))}
          </div>

          <CartInfo />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
