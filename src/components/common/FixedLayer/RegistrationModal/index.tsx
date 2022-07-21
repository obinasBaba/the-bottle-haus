import React, { useEffect, useLayoutEffect, useState } from 'react';
import s from './registrationmodal.module.scss';

import SignupBg from '@/public/signup-bg.webp';
import SignInBg from '@/public/signin-bg.webp';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import GG from './google.svg';
import { useUI } from '@/context/ui/context';
import { signOut, useSession } from 'next-auth/react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  MotionConfig,
  useAnimation,
  Variants,
} from 'framer-motion';
import { basicVariants, MotionChild, MotionParent } from '@/components/common/MotionItems';

type REG_TYPE = 'sign up' | 'sign in';

const signInVariant = {
  initial: {
    opacity: 0,
  },
  signIn: {
    opacity: 1,
  },

  signUp: {
    opacity: 0,
  },
};
const signOutVariant = {
  initial: {
    opacity: 0,
  },
  signIn: {
    opacity: 0,
  },
  signUp: {
    opacity: 1,
  },
};

const text: Variants = {
  initial: {
    opacity: 0,
  },
  signIn: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 1.4,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },

  signUp: {
    opacity: 0,
    transition: {
      duration: 0.7,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
};

const RegistrationModal = () => {
  const [type, setType] = useState<REG_TYPE>('sign in');
  const [signUp, setSignUp] = useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const [values, setValues] = useState<any>({
    email: '',
    password: '',
  });

  const { closeModal } = useUI();
  const { data: session } = useSession();
  const control = useAnimation();
  const signUpImg = useAnimation();

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        setValues({
          email: session.user?.email,
          password: session.expires,
        });
      }, 1500);
    }
  }, [session]);

  const withGoogle = () => {
    const left = window.top!.outerWidth / 2 + window.top!.screenX - 250;
    const top = window.top!.outerHeight / 2 + window.top!.screenY - 250;

    const config = `menubar=yes,location=yes,resizable=no,scrollbars=yes,status=no,height=500,width=500,left=${left},top=${top}`;
    const win = window.open('/auth/sign-in', '_blank', config);
  };

  useLayoutEffect(() => {
    if (signUp) {
      control.start('signUp');
    } else {
      control.start('signIn');
    }
  }, [signUp, control]);

  return (
    <motion.div className={s.container}>
      <div className="blur" onClick={() => closeModal()} />

      <motion.div variants={{}} className="signup_wrapper signin">
        <>
          <button
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
          </button>

          <MotionParent className="art" variants={{}} layout>
            <MotionConfig
              transition={{
                duration: 1.4,
                ease: [0.165, 0.84, 0.44, 1],
              }}>
              <MotionChild className="img" animate={control} variants={signInVariant}>
                <Image src={SignupBg} alt="signup bg" objectFit="cover" />
              </MotionChild>

              <MotionChild className="signin_bg" animate={control} variants={signOutVariant}>
                <Image src={SignInBg} alt="signup bg" objectFit="cover" />
              </MotionChild>

              <div className="text">
                <motion.h3 animate={control} variants={text}>
                  <span>Premium</span> Spirits Shipped Right To Your Door
                </motion.h3>
              </div>
            </MotionConfig>
          </MotionParent>

          <motion.div className="col" layout>
            <LayoutGroup>
              <motion.div layout>
                <h2 className="title"> {signUp ? 'SignUp' : 'Login'}</h2>
                <small>
                  Don`&apos;t have an account yet?{' '}
                  <Button variant="text" onClick={() => setSignUp(!signUp)}>
                    {signUp ? 'Login here' : 'SignIn here'}
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
              <AnimatePresence exitBeforeEnter>
                {signUp && (
                  <motion.div
                    variants={basicVariants}
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
                  className="tfield"
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
                <Button size="large" variant="contained" fullWidth>
                  {signUp ? 'Sign Up' : 'Sign in'}
                </Button>
              </motion.div>
            </LayoutGroup>
          </motion.div>
        </>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationModal;
