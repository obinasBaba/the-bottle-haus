import React, { useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { MotionParent } from '@/components/common/MotionItems';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Form, Formik, FormikProps } from 'formik';
import ContactInformation from '@/scenes/CheckoutPage/ContactInformation';
import ShippingMethod from '@/scenes/CheckoutPage/ShippingMethod';
import ShippingAddress from '@/scenes/CheckoutPage/ShippingAddress';
import Payment from '@/scenes/CheckoutPage/Payment';
import s from './checkoutpage.module.scss';
import { CheckCircle, Downloading, HourglassBottom, RadioButtonUnchecked } from "@mui/icons-material";
import { useRouter } from 'next/router';
import { useAppInfo } from '@/context/MotionValuesContext';
import { FormikHelpers } from 'formik/dist/types';
import { CartInfo } from '@/scenes/CheckoutPage/cartInfo';
import { pageTransition } from '@/scenes/Homepage';

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
    opacity: 0, // scale: 0.92,
  },
};

const steps = [
  {
    name: 'Contact Information',
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

export const StepScaffold = ({ children, controller, title }: any) => {
  const { idx, prevStep, processingPayment } = controller;

  const router = useRouter();
  const [disable, setDisable] = useState(false);

  return (
    <div className={s.scaffold}>
      <header>
        <Button variant="contained">{idx + 1}</Button>
        <h2>{title}</h2>
      </header>

      {children}

      <div className="hor bottom_controller">
        {idx !== 0 && (
          <Button
            variant="outlined"
            className="in_btn"
            size="large"
            color="primary"
            disabled={processingPayment}
            onClick={() => (idx == 0 ? router.push('/cart') : prevStep())}>
            Back
          </Button>
        )}



        <Button
          startIcon={ processingPayment && <HourglassBottom color='secondary'/> }
          variant="contained"

          size="large"
          // className={clsx([{ [s.alone]: idx === 0 }])}
          disabled={processingPayment}
          type="submit"
          onClick={() => {
            if (idx == 3) {
              // setTimeout(() => setDisable(true), 200);
            }
          }}>
          {idx == 3 ? 'Pay Now' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

const CompletedSteps = (props: { completed: Completed } & Record<string, any>) => {
  const {
    completed,
    controller: { setStep, idx },
  } = props;

  return (
    <div className={s.step_info}>
      {completed.map(({ completed, name, data, idx }, index) => (
        <div className={s.completed_step} key={name}>
          <div className={s.step_indicator}>
            <IconButton color={completed && data ? 'primary' : 'secondary'}>
              {completed && data ? <CheckCircle /> : <RadioButtonUnchecked />}
            </IconButton>
          </div>
          <div className={s.text}>
            <h4 className={s.step_name}>{name}</h4>
            <small> {data || ' --'} </small>
          </div>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setStep(idx);
            }}>
            edit
          </Button>
        </div>
      ))}
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

type Completed = {
  completed: boolean;
  idx: number;
  name: string;
  data: string | null;
}[];

const CheckoutPage = () => {
  const [idx, setIdx] = useState(0);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [activeStep, setActiveStep] = useState<typeof steps[number]>(steps[idx]);
  const { toolTipsData } = useAppInfo();
  const [checkoutFormData, pushCheckoutFormData] = useState<
    Completed
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
      case 3:
        return `${value.card_name}, ${value.card_number} `;
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

      setProcessingPayment(true)

      pushCheckoutFormData([
        ...checkoutFormData.slice(0, checkoutFormData.length - 1),
        {
          ...checkoutFormData[checkoutFormData.length - 1],
          data: getFormData(idx, value),
          completed: false,
        },
      ]);

      return;
    }

    const nextStep = steps[idx + 1];

    // push if not exist or update if exist
    if (checkoutFormData.map(({ name }) => name).includes(nextStep?.name)) {
      pushCheckoutFormData(
        checkoutFormData.map((c, idx) => ({
          ...c,
          completed: c.name != nextStep.name && c.idx <= idx + 1,
        })),
      );
    } else {
      pushCheckoutFormData([
        ...checkoutFormData.map((c, idx) => ({
          ...c,
          data: getFormData(idx, value),
          completed: true,
        })),
        {
          completed: false,
          idx: idx + 1,
          name: nextStep.name,
          data: null,
        },
      ]);
    }

    if (idx == steps.length - 1) return;

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

  return (
    <div className={s.container}>
      <div className="wrapper">
        <h1 className={s.checkout_title}>
          Checkout <span>Detail</span>
        </h1>

        <div className="wrapper2">
          <LayoutGroup>
            <motion.div className="checkout_form" layout>
              <MotionParent className="active_step" layout>
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
                            transition={{ ...pageTransition, duration: 1.1 }}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={activeStep.name}
                            layout>
                            <StepScaffold
                              controller={{ nextStep, prevStep, setStep, idx, processingPayment }}
                              title={activeStep.name}>
                              {activeStep.component({
                                formikProps,
                              })}
                            </StepScaffold>
                          </motion.div>
                        </AnimatePresence>
                      </LayoutGroup>
                    </Form>
                  )}
                </Formik>
              </MotionParent>
            </motion.div>
          </LayoutGroup>

          <div className="sidebar_info">
            <CompletedSteps
              completed={checkoutFormData}
              controller={{ nextStep, prevStep, setStep, idx }}
            />

            <CartInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
