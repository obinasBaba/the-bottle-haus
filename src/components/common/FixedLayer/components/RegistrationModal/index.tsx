import React, { useState } from 'react';
import s from './registrationmodal.module.scss';

import SignupBg from '@/public/signup-bg.webp';
import SignInBg from '@/public/signin-bg.webp';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import GG from './google.svg';
import { useUI } from '@/context/ui/context';

type REG_TYPE = 'sign up' | 'sign in';

const RegistrationModal = () => {
  const [type, setType] = useState<REG_TYPE>('sign in');

  const { closeModal } = useUI();

  return (
    <div className={s.container}>
      <div className="blur" onClick={() => closeModal()} />

      {type === 'sign in' ? (
        <div className="signup_wrapper signin">
          <button
            aria-label="close menu"
            className="close_cross"
            type="button"
            onClick={() => closeModal()}>
            <svg width={'100%'} height="100%" viewBox="0 0 87 87">
              <g stroke="gray" strokeWidth="8" fill="none" fillRule="evenodd">
                <path className="_1s9fS" d="M4.5 3.5l39.573 39.573"></path>
                <path className="_1s9fS" d="M83.5 3.5L44.073 43.073"></path>
                <path className="_1s9fS" d="M83.5 82.5L44.073 43.073"></path>
                <path className="_1s9fS" d="M4.5 82.5l39.573-39.427"></path>
              </g>
            </svg>
          </button>

          <div className="art">
            <div className="img">
              <Image src={SignupBg} alt="signup bg" objectFit="cover" />
            </div>
            <h3 className="text">
              <span>Premium</span> Spirits Shipped Right To Your Door
            </h3>
          </div>

          <div className="col">
            <h2 className="title">Login</h2>
            <small>
              Don`&apos;t have an account yet?{' '}
              <Button variant="text" onClick={() => setType('sign up')}>
                Sign up here
              </Button>
            </small>

            <Button
              size="large"
              variant="outlined"
              startIcon={<Image src={GG} />}
              color="secondary">
              sign in with google
            </Button>

            <div className="divider">
              <div className="line" />
              <small className="or">OR</small>
            </div>

            <TextField name="email" label="Email" type="email" variant="outlined" />
            <TextField
              className="tfield"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
            />

            <Button className="forgot" variant="text">
              Forgot password
            </Button>

            <Button size="large" variant="contained">
              Sign in
            </Button>
          </div>
        </div>
      ) : (
        <div className="signup_wrapper">
          <div className="art">
            <div className="img">
              <Image src={SignInBg} alt="signup bg" objectFit="cover" />
            </div>
          </div>

          <div className="col">
            <h2 className="title">Sign in</h2>
            <small>
              Already have an account?{' '}
              <Button variant="text" onClick={() => setType('sign in')}>
                Login here
              </Button>
            </small>

            <Button
              size="large"
              variant="outlined"
              startIcon={<Image src={GG} />}
              color="secondary">
              login with google
            </Button>

            <div className="divider">
              <div className="line" />
              <small className="or">OR</small>
            </div>

            <div className="hor">
              <TextField name="first-name" label="First name" type="text" variant="outlined" />
              <TextField name="last-name" label="Last name" type="text" variant="outlined" />
            </div>

            <TextField name="email" label="Email" type="email" variant="outlined" />
            <TextField
              className="tfield"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
            />

            <Button variant={'contained'} size="large">
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationModal;
