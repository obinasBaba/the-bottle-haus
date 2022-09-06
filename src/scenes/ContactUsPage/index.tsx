import React from 'react';
import s from './contactus.module.scss';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import Top from './contact-us-bg-top.png';
import Bottom from './checkout-bg.png';

const ContactUsPage = () => {
  return (
    <div className={s.container} id="contact-us">
      <div
        className={s.bg}
        data-scroll={true}
        data-scroll-sticky={true}
        data-scroll-target="#contact-us">
        <div className={s.top}>
          <Image src={Top} alt="contact-us background art" />
        </div>

        <div className={s.bottom}>
          <Image src={Bottom} alt="contact-us background art" />
        </div>
      </div>

      <div className={s.wrapper}>
        <>
          <h1 className={s.contact_us_title}>
            Feedback <span>Form</span>
          </h1>
        </>

        <div className={s.content}>
          <div className={s.form_wrapper}>
            <div className={s.form}>
              <header>
                If you can not reach us by phone, please fill out the form below and we will get
                back to you as soon as possible.
              </header>

              <div className={s.hor}>
                <TextField id="name" label="name" variant="outlined" />
                <TextField id="phone" label="phone" variant="outlined" />
              </div>

              <TextField id="email" label="email" variant="outlined" />
              <TextField id="message" label="message" variant="outlined" multiline rows={7} />

              <Button size="large" variant="contained" data-cursor="-opaque">
                Send Message
              </Button>
            </div>
          </div>

          <div className={s.contact_detail}>
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
              power outage! We are working urgently to resolve this issue and process your requests.
              If you need to reach us, please do so by email & we will do our best to respond within
              24 hours. Cheers & Happy Holidays!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
