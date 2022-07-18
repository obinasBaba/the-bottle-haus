import React, { useEffect, useState } from 'react';
import s from './registrationmodal.module.scss';

import SignupBg from '@/public/signup-bg.webp';
import SignInBg from '@/public/signin-bg.webp';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import GG from './google.svg';
import { useUI } from '@/context/ui/context';
import { signOut, useSession } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import { basicVariants, MotionParent } from '@/components/common/MotionItems';

type REG_TYPE = 'sign up' | 'sign in';

const RegistrationModal = () => {
  const [type, setType] = useState<REG_TYPE>('sign in');
  const [signUp, setSignUp] = useState<boolean>(true);
  const [loading, setLoading] = React.useState(true);
  const [values, setValues] = useState<any>({
    email: '',
    password: '',
  });

  const { closeModal } = useUI();
  const { data: session } = useSession();

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
    const left = window.top.outerWidth / 2 + window.top.screenX - 250;
    const top = window.top.outerHeight / 2 + window.top.screenY - 250;

    const config = `menubar=yes,location=yes,resizable=no,scrollbars=yes,status=no,height=500,width=500,left=${left},top=${top}`;
    const win = window.open('/auth/sign-in', '_blank', config);
  };

  return (
    <motion.div className={s.container}>
      <div className="blur" onClick={() => closeModal()} />

      <>
        <motion.div variants={{}} className="signup_wrapper signin">
          <button
            aria-label="close menu"
            className="close_cross"
            type="button"
            onClick={() => {
              // closeModal();
              signOut({ redirect: false }).then(console.log);
              setValues({ password: '', email: '' });
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

          <MotionParent className="art" variants={{}}>
            <AnimatePresence exitBeforeEnter>
              {
                <motion.div
                  className="img"
                  key={signUp.toString() + Math.random()}
                  variants={{
                    initial: { opacity: 0, scale: 0.91 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0 },
                  }}>
                  <Image src={signUp ? SignupBg : SignInBg} alt="signup bg" objectFit="cover" />
                </motion.div>
              }
            </AnimatePresence>

            {signUp && (
              <h3 className="text">
                <span>Premium</span> Spirits Shipped Right To Your Door
              </h3>
            )}
          </MotionParent>

          <motion.div className="col" layout>
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

            <motion.div layout>
              <AnimatePresence presenceAffectsLayout>
                {signUp ? (
                  <motion.div
                    variants={basicVariants}
                    initial="initial"
                    key={'sinin'}
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
                ) : (
                  <motion.div layout key={'outt'} />
                )}
              </AnimatePresence>
            </motion.div>

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

            <motion.div layout>
              <Button size="large" variant="contained" fullWidth>
                {signUp ? 'Sign Up' : 'Sign in'}
              </Button>
            </motion.div>

            {/* {!signUp && (
              <Button className="forgot" variant="text">
                Forgot password
              </Button>
            )}
*/}
          </motion.div>
        </motion.div>
      </>
    </motion.div>
  );
};

export default RegistrationModal;
