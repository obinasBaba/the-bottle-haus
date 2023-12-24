'use client';

import React from 'react';
import Link from 'next/link';
import MasterCard from '@/public/mastercard.svg';
import Discover from '@/public/discover.svg';
import Paypal from '@/public/paypal.svg';
import Image from 'next/image';
import Bg from './footer-bg.png';
import Sign from './circle-logo.png';
import Houses from '@/public/houses.png';
import { Button, InputAdornment, TextField } from '@mui/material';
import s from './footer.module.scss';

const Footer = () => {
  return (
    <div className={s.container} data-scroll-section={true}>
      <div className={s.bg}>
        <Image src={Bg} alt="footer background image" />
      </div>

      <div className={s.house}>
        <div className={s.img}>
          <Image src={Houses} alt="old house image" />
        </div>

        <p>
          @2022 <span>Juvihaus.inc</span>, All right reserved,
          <small>Please Drink Responsibly 😉</small>
        </p>
      </div>

      <div className={s.signature}>
        <Image src={Sign} alt="signature logo" />
      </div>

      <div className={s.wrapper}>
        <div className={s.proposition}>
          <h2 className={s.title}>proposition 65 Warning</h2>
          <p className={s.warning}>
            WARNING: Drinking distilled spirits, beer, coolers, wine and other alcoholic beverages
            may increase cancer risk, and, during pregnancy, can cause birth defects. For more
            information go to www.P65Warnings.ca.gov/alcohol
          </p>
        </div>

        <div className={s.newsletter}>
          <div className={s.letter}>
            <h2 className={s.title}> Newsletter </h2>
            <p className={s.subscribe}>
              Subscribe to be the first to hear about our exclusive offers and latest arrivals.
            </p>
            <div className={s.input}>
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

        <div className={s.right}>
          <div className={s.resources}>
            <h2>Resources</h2>
            <div className={s.links}>
              <Link href={'/'}>
                <>Terms and Conditions</>
              </Link>
              <Link href={'/'}>
                <>Privacy Policy</>
              </Link>
              <Link href={'/'}>
                <>Shipping & Return Policy</>
              </Link>
              <Link href="/contact-us">
                <>Contact Us</>
              </Link>
              <Link href={'/'}>
                <>Order Tracking</>
              </Link>
            </div>
          </div>

          <div className={s.payments}>
            <h3>Accepted Payments</h3>
            <div className={s.methods}>
              <Image src={Paypal} alt="paypal icon" />
              <Image src={Discover} alt="discover icon" />
              <Image src={MasterCard} alt="master icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
