import React, { useState } from 'react';
import s from './contactus.module.scss';
import { Button, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Top from './contact-us-bg-top.png';
import Bottom from './checkout-bg.png';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import {
  boxContainerVariants,
  boxVariants,
  swappingFormVariants,
} from '@/scenes/CheckoutPage/transition';
import { pageTransition } from '@/scenes/Homepage';
import { Form, Formik } from 'formik';

const artVariants = {
  initial(pos: { top: boolean }) {
    return {
      opacity: 0,
      scale: 0.87,
      y: pos?.top ? '-100%' : '100%',
      x: pos?.top ? 0 : '40%',
    };
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
  },
  exit(pos: { top: boolean }) {
    return {
      opacity: 0,
      scale: 0.92,
      y: pos?.top ? '-100%' : '100%',
      x: pos?.top ? 0 : '40%',
    };
  },
};

function ContactForm() {
  return (
    <div className={s.form}>
      <header>
        If you can not reach us by phone, please fill out the form below and we will get back to you
        as soon as possible.
      </header>

      <div className={s.hor}>
        <TextField id="name" label="name" variant="outlined" />
        <TextField id="phone" label="phone" variant="outlined" />
      </div>

      <TextField id="email" label="email" variant="outlined" />
      <TextField id="message" label="message" variant="outlined" multiline rows={5} />

      <Button size="large" variant="contained" data-cursor="-opaque" type="submit">
        Send Message
      </Button>
    </div>
  );
}

function ThankYou() {
  return (
    <div className={s.form}>
      <Typography variant="body1">Thank you we will be in touch,</Typography>
    </div>
  );
}

const steps = [
  {
    name: 'contact-form',
    component: (props: any) => <ContactForm {...props} />,
  },
  {
    name: 'thank-you',
    component: (props: any) => <ThankYou {...props} />,
  },
];

const ContactUsPage = () => {
  const [currentStep, setCurrentStep] = useState<typeof steps[number]>(steps[0]);

  function handleSubmit(values: any) {
    console.log('handle submint', values);
    setCurrentStep(steps[1]);
  }

  return (
    <motion.div className={s.container} id="contact-us">
      <MotionConfig transition={{ ...pageTransition }}>
        <motion.div
          className={s.bg}
          data-scroll={true}
          data-scroll-sticky={true}
          data-scroll-target="#contact-us"
          variants={boxContainerVariants}>
          <motion.div className={s.top} variants={artVariants} custom={{ top: true }}>
            <Image src={Top} alt="contact-us background art" />
          </motion.div>

          <motion.div className={s.bottom} variants={artVariants}>
            <Image src={Bottom} alt="contact-us background art" />
          </motion.div>
        </motion.div>

        <motion.div className={s.wrapper} variants={boxContainerVariants}>
          <motion.h1 className={s.contact_us_title} variants={boxVariants}>
            Feedback <span>Form</span>
          </motion.h1>

          <motion.div className={s.content} variants={boxContainerVariants}>
            <motion.div className={s.form_wrapper} variants={boxVariants} layout>
              <Formik
                initialValues={{}}
                validateOnMount={false}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit}>
                {(formikProps) => (
                  <Form>
                    <AnimatePresence mode='wait'>
                      <motion.div key={currentStep.name} variants={swappingFormVariants}>
                        {currentStep.component({
                          formikProps,
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
            </motion.div>

            <motion.div className={s.contact_detail} variants={boxVariants}>
              <h2>Contact Us</h2>
              <p>
                By Phone : <span>+1 (619) 790-4174</span>
              </p>
              <p>
                By Email : <span>Concierge@thebottlehaus.com</span>
              </p>

              <hr />

              <h5>Monday-Friday 9:00AM - 5:00PM PST</h5>
              <p>
                <span className={s.attention}>Attention :</span> Our Call Center is down due to a
                power outage! We are working urgently to resolve this issue and process your
                requests. If you need to reach us, please do so by email & we will do our best to
                respond within 24 hours. Cheers & Happy Holidays!
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </MotionConfig>
    </motion.div>
  );
};

export default ContactUsPage;
