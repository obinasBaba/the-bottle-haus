import { LayoutGroup, motion } from 'framer-motion';
import { pageTransition } from '@/scenes/Homepage';
import { Button, IconButton } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import React from 'react';
import { Completed } from '@/scenes/CheckoutPage/index';
import s from '@/scenes/CheckoutPage/checkoutpage.module.scss';

export const CompletedSteps = (props: { completed: Completed } & Record<string, any>) => {
  const {
    completed,
    controller: { setStep },
  } = props;

  return (
    <LayoutGroup>
      <motion.div className={s.step_info} layout>
        {completed.map(({ completed, name, data, idx }, index) => (
          <motion.div
            className={s.completed_step}
            key={name}
            layout
            transition={{ ...pageTransition }}
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{ opacity: 1, scale: 1 }}>
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
          </motion.div>
        ))}
      </motion.div>
    </LayoutGroup>
  );
};
