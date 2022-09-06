import { useRouter } from 'next/router';
import React, { useState } from 'react';
import s from '@/scenes/CheckoutPage/checkoutpage.module.scss';
import { Button } from '@mui/material';
import { HourglassBottom } from '@mui/icons-material';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { CheckoutFormStepComponent } from '@/scenes/CheckoutPage/index';

export const StepScaffold: CheckoutFormStepComponent = ({
  children,
  controller,
  title,
  formikProps,
}: any) => {
  const { idx, prevStep, processingPayment, nextStep } = controller;

  const router = useRouter();
  const [disable, setDisable] = useState(false);
  const { scroll } = useLocomotiveScroll();

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
            data-cursor="-opaque"
            size="large"
            color="primary"
            disabled={processingPayment}
            onClick={() => {
              return prevStep();

              scroll?.scrollTo(0, {
                duration: 1,
                easing: [0.6, 0.01, 0, 0.9],
                callback() {
                  prevStep();
                },
              });
            }}>
            Back
          </Button>
        )}

        <Button
          startIcon={processingPayment && <HourglassBottom color="secondary" />}
          data-cursor="-opaque"
          variant="contained"
          size="large"
          disabled={processingPayment}
          type="submit"
          onClick={(ev) => {
            // ev.preventDefault();
            return;

            scroll?.scrollTo(0, {
              duration: 1.4,
              easing: [0.6, 0.01, 0, 0.9],
              callback() {
                formikProps.validateForm();
                // formikProps.submitForm();
              },
            });
          }}>
          {processingPayment ? 'processing...' : idx == 3 ? 'Pay Now' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
