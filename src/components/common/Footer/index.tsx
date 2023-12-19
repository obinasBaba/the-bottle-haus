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
      <div className="bg">
        <Image src={Bg} objectFit="cover" alt="footer background image" />
      </div>

      <div className="house">
        <div className="img">
          <Image src={Houses} objectFit="cover" alt="old house image" />
        </div>

        <p>
          @2022 <span>Juvihaus.inc</span>, All right reserved,
          <small>Please Drink Responsibly 😉</small>
        </p>
      </div>

      <div className="signature">
        <Image src={Sign} objectFit="cover" alt="signature logo" />
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
                <>Terms and Conditions</>
              </Link>
              <Link href={'/'}>
                <>Privacy Policy</>
              </Link>
              <Link href={'/'}>
                <>Shipping & Return Policy</>
              </Link>
              <Link href="/src/pages/contact-us">
                <>Contact Us</>
              </Link>
              <Link href={'/'}>
                <>Order Tracking</>
              </Link>
            </div>
          </div>

          <div className="payments">
            <h3>Accepted Payments</h3>
            <div className="methods">
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
