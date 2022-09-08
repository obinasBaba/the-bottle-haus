import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Form, Formik, FormikProps } from 'formik';
import ContactInformation from '@/scenes/CheckoutPage/ContactInformation';
import ShippingMethod from '@/scenes/CheckoutPage/ShippingMethod';
import ShippingAddress from '@/scenes/CheckoutPage/ShippingAddress';
import Payment from '@/scenes/CheckoutPage/Payment';
import s from './checkoutpage.module.scss';
import { useAppInfo } from '@/context/MotionValuesContext';
import { FormikHelpers } from 'formik/dist/types';
import { CartInfo } from '@/scenes/CheckoutPage/cartInfo';
import { pageTransition } from '@/scenes/Homepage';
import Image from 'next/image';
import LTop from './leaf-top.png';
import LBottom from './leaf-bottom.png';
import {
  activeFormVariants,
  boxContainerVariants,
  boxVariants,
  swappingFormVariants,
} from '@/scenes/CheckoutPage/transition';
import { StepScaffold } from '@/scenes/CheckoutPage/StepScaffold';
import { CompletedSteps } from '@/scenes/CheckoutPage/CompletedSteps';
import { useLocomotiveScroll } from '@/context/LocoMotive';

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

export type Completed = {
  completed: boolean;
  idx: number;
  name: string;
  data: string | null;
}[];

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
const CheckoutPage = () => {
  const [idx, setIdx] = useState(0);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [activeStep, setActiveStep] = useState<typeof steps[number]>(steps[idx]);
  const { toolTipsData } = useAppInfo();
  const { scroll } = useLocomotiveScroll();

  const [checkoutFormData, pushCheckoutFormData] = useState<Completed>([
    {
      completed: false,
      idx: 0,
      name: activeStep.name,
      data: null,
    },
  ]);

  const nextStep = (value: typeof initialValues, helper: FormikHelpers<typeof initialValues>) => {
    if (!value) return;

    if (idx == steps.length - 1) {
      toolTipsData.set({
        closable: false,
        text: 'Processing Payment ....',
      });

      setProcessingPayment(true);

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
    <div className={s.container} id="checkout-page-container">
      <LayoutGroup>
        <motion.div
          className={s.checkout_bg}
          data-scroll={true}
          data-scroll-sticky={true}
          data-scroll-target="#checkout-page-container"
          variants={boxVariants}
          transition={pageTransition}>
          <motion.div className={s.top} variants={boxVariants} transition={pageTransition}>
            <Image src={LTop} alt="checkout background art" />
          </motion.div>

          <motion.div className={s.bottom} variants={boxVariants} transition={pageTransition}>
            <Image src={LBottom} alt="checkout background art" />
          </motion.div>
        </motion.div>

        <motion.div className="wrapper" variants={boxContainerVariants}>
          <motion.h1
            className={s.checkout_title}
            variants={boxVariants}
            transition={pageTransition}>
            Checkout <span>Detail</span>
          </motion.h1>

          <motion.div
            className="wrapper2"
            layout
            layoutScroll
            onBeforeLayoutMeasure={() => {
              scroll?.update();
              scroll?.start();
            }}
            // onLayoutAnimationStart={() => scroll?.update()}
            onLayoutAnimationComplete={() => {
              setTimeout(() => {
                scroll?.scrollTo(0, {
                  duration: 1.3,
                  easing: [0.6, 0.01, 0, 0.9],
                });
              }, 300);
            }}>
            <LayoutGroup>
              <motion.div
                className="checkout_form"
                layout
                layoutScroll
                variants={activeFormVariants}>
                <motion.div className="active_step" layout layoutScroll>
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
                              variants={swappingFormVariants}
                              transition={{ ...pageTransition, duration: 1.1 }}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              key={activeStep.name}
                              layout>
                              <StepScaffold
                                formikProps={formikProps}
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
                </motion.div>
              </motion.div>
            </LayoutGroup>

            <LayoutGroup>
              <motion.div
                className="sidebar_info"
                layout
                variants={boxVariants}
                transition={pageTransition}>
                <CompletedSteps
                  completed={checkoutFormData}
                  controller={{ nextStep, prevStep, setStep, idx }}
                />

                <CartInfo prossingPayment={processingPayment} />
              </motion.div>
            </LayoutGroup>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default CheckoutPage;
