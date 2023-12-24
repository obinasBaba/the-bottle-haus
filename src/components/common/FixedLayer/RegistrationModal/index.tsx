'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import s from './registrationmodal.module.scss';

import SignupBg from '@/public/signup-bg.webp';
import SignInBg from '@/public/signin-bg.webp';
import { Button, IconButton, TextField } from '@mui/material';
import Image from 'next/image';
import GG from './google.svg';
import { useUI } from '@/context/ui/context';
import { signOut } from 'next-auth/react';
import { AnimatePresence, LayoutGroup, motion, MotionConfig, useAnimation } from 'framer-motion';
import { basicVariants, MotionChild, MotionParent } from '@/components/common/MotionItems';
import { useFormik } from 'formik';
import { useAppInfo } from '@/context/MotionValuesContext';
import {
  blurTransition,
  registrationModalVariants,
  signInVariant,
  signOutVariant,
  text,
  transition,
} from '@fixedLayer/RegistrationModal/variants';

type REG_TYPE = 'sign up' | 'sign in';

const RegistrationModal = () => {
  const [signUp, setSignUp] = useState<boolean>(false);
  const { toolTipsData } = useAppInfo();
  const windowRef = useRef<Window | null>(null);
  const [values, setValues] = useState<any>({
    email: null,
    password: null,
  });

  const { closeModal } = useUI();
  const { data: session } = { data: {} };
  const control = useAnimation();

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        // setValues({
        //   email: session.user?.email,
        //   password: session.expires,
        // });
      }, 500);
    }
  }, [session]);

  useEffect(() => {
    // console.log()
  }, []);

  const withGoogle = () => {
    const left = window.top!.outerWidth / 2 + window.top!.screenX - 250;
    const top = window.top!.outerHeight / 2 + window.top!.screenY - 250;

    const config = `menubar=yes,location=yes,resizable=no,scrollbars=yes,status=no,height=500,width=500,left=${left},top=${top}`;
    const win = window.open('/auth/sign-in', '_blank', config);
    windowRef.current = win;
  };

  const formic = useFormik({
    initialValues: {
      email: values.email,
      password: values.password,
    },
    onSubmit(value) {
      toolTipsData.set({
        text: 'Something is Wrong!',
        duration: 2000,
      });
    },
  });

  useLayoutEffect(() => {
    if (signUp) {
      control.start('signUp');
    } else {
      control.start('signIn');
    }
  }, [signUp, control]);

  return (
    <MotionParent className={s.container} variants={{}}>
      <motion.div
        variants={basicVariants}
        transition={blurTransition}
        className="blur"
        onClick={() => closeModal()}
      />

      <LayoutGroup id="wrap" inherit={false}>
        <motion.div
          variants={registrationModalVariants}
          transition={transition}
          className="signup_wrapper signin"
          layout>
          <IconButton
            aria-label="close menu"
            className="close_cross"
            type="button"
            onClick={() => {
              signOut({ redirect: false });
              setValues({ password: '', email: '' });
              closeModal();
            }}>
            <svg width={'100%'} height="100%" viewBox="0 0 87 87">
              <g stroke="gray" strokeWidth="8" fill="none" fillRule="evenodd">
                <path className="_1s9fS" d="M4.5 3.5l39.573 39.573"></path>
                <path className="_1s9fS" d="M83.5 3.5L44.073 43.073"></path>
                <path className="_1s9fS" d="M83.5 82.5L44.073 43.073"></path>
                <path className="_1s9fS" d="M4.5 82.5l39.573-39.427"></path>
              </g>
            </svg>
          </IconButton>

          <MotionParent className="art" variants={{}} layout>
            <MotionConfig
              transition={{
                duration: 1.4,
                ease: [0.165, 0.84, 0.44, 1],
              }}>
              <MotionChild className="img" animate={control} variants={signInVariant} layout>
                <Image src={SignupBg} alt="signup bg" objectFit="cover" />
              </MotionChild>

              <MotionChild className="img" animate={control} variants={signOutVariant} layout>
                <Image src={SignInBg} alt="signup bg" objectFit="cover" />
              </MotionChild>

              <div className="text">
                <motion.h3 animate={control} variants={text}>
                  <span>Premium</span> Spirits Shipped Right To Your Door
                </motion.h3>
              </div>
            </MotionConfig>
          </MotionParent>

          <motion.form className="col" layout onSubmit={formic.handleSubmit}>
            <LayoutGroup>
              <motion.div layout>
                <h2 className="title"> {signUp ? 'SignUp' : 'Login'}</h2>
                <small>
                  Don`&apos;t have an account yet?{' '}
                  <Button variant="text" onClick={() => setSignUp(!signUp)}>
                    {signUp ? 'LogIn here' : 'SignUp here'}
                  </Button>
                </small>

                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Image src={GG} alt="google icon" />}
                  color="secondary"
                  disabled={!!session}
                  onClick={() => withGoogle()}>
                  {signUp ? 'SignUp' : 'Sign in'} with google
                </Button>

                <div className="divider">
                  <div className="line" />
                  <small className="or">OR</small>
                </div>
              </motion.div>
              <AnimatePresence mode="wait">
                {signUp && (
                  <motion.div
                    variants={basicVariants}
                    inherit={false}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="hor"
                    layout>
                    <TextField
                      name="first-name"
                      label="First name"
                      type="text"
                      variant="outlined"
                    />
                    <TextField name="last-name" label="Last name" type="text" variant="outlined" />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div layout>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={values.email}
                />
              </motion.div>

              <motion.div layout>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={values.password}
                />
              </motion.div>

              {!signUp && (
                <motion.div layout>
                  <Button className="forgot" variant="text">
                    Forgot password
                  </Button>
                </motion.div>
              )}

              <motion.div layout>
                <Button size="large" variant="contained" fullWidth type="submit">
                  {signUp ? 'Sign Up' : 'Sign in'}
                </Button>
              </motion.div>
            </LayoutGroup>
          </motion.form>
        </motion.div>
      </LayoutGroup>
    </MotionParent>
  );
};

export default function RegistrationModalWrapper() {
  const { displayModal } = useUI();

  return <AnimatePresence mode="wait">{displayModal && <RegistrationModal />}</AnimatePresence>;
}
