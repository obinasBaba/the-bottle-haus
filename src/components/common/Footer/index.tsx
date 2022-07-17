import React from 'react';
import s from './fotter.module.scss';
import Link from 'next/link';
import MasterCard from './mastercard.svg';
import Discover from './discover.svg';
import Paypal from './paypal.svg';
import Image from 'next/image';
import Bg from './footer-bg.png';
import Sign from './signature.png';
import Houses from './houses.png';
import { Button, InputAdornment, TextField } from '@mui/material';

const Footer = () => {
  return (
    <div className={s.container}>
      <div className="bg">
        <Image src={Bg} objectFit="cover" />
      </div>

      <div className="house">
        <div className="img">
          <Image src={Houses} objectFit="cover" />
        </div>

        <p>
          @2022 <span>bottlehaus.inc</span>, All right reserved,{' '}
          <small>Please Drink Responsibly 😉</small>
        </p>
      </div>

      <div className="signature">
        <Image src={Sign} objectFit="cover" />
      </div>

      <div className="wrapper">
        <div className="proposition">
          <h2 className="title">proposition 65 Warning</h2>
          <p className="warning">
            WARNING: Drinking distilled spirits, beer, coolers, wine and other alcoholic beverages
            may increase cancer risk, and, during pregnancy, can cause birth defects. For more
            information go to www.P65Warnings.ca.gov/alcohol
          </p>
        </div>

        <div className="newsletter">
          <div className="letter">
            <h2 className="title"> Newsletter </h2>
            <p className="subscribe">
              Subscribe to be the first to hear about our exclusive offers and latest arrivals.
            </p>
            <div className="input">
              <TextField
                fullWidth
                type="email"
                size="small"
                variant="outlined"
                color="primary"
                label="email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button variant="contained" size="large">
                        subscribe
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>

        <div className="right">
          <div className="resources">
            <h2>Resources</h2>
            <div className="links">
              <Link href={'/'}>
                <a>Terms and Conditions</a>
              </Link>
              <Link href={'/'}>
                <a>Privacy Policy</a>
              </Link>
              <Link href={'/'}>
                <a>Shipping & Return Policy</a>
              </Link>
              <Link href="/contact-us">
                <a>Contact Us</a>
              </Link>
              <Link href={'/'}>
                <a>Order Tracking</a>
              </Link>
            </div>
          </div>

          <div className="payments">
            <h3>Accepted Payments</h3>
            <div className="methods">
              <Image src={Paypal} />
              <Image src={Discover} />
              <Image src={MasterCard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
