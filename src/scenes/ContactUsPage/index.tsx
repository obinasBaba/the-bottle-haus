import React from 'react';
import s from './contactus.module.scss';
import Button from '@/components/Button';
import { TextField } from '@mui/material';

const ContactUsPage = () => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <header>
          <h1>
            Feedback <span>Form</span>
          </h1>
        </header>

        <div className="content">
          <div className="form_modal">
            <header>
              If you can not reach us by phone, please fill out the form below and we will get back
              to you as soon as possible.
            </header>

            <TextField id="name" label="name" variant="outlined" />
            <TextField id="email" label="email" variant="outlined" />
            <TextField id="phone" label="phone" variant="outlined" />
            <TextField id="message" label="message" variant="outlined" multiline rows={7} />

            <Button text="Send Message" />
          </div>

          <div className="contact_detail">
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
              Attention: Our Call Center is down due to a power outage! We are working urgently to
              resolve this issue and process your requests. If you need to reach us, please do so by
              email & we will do our best to respond within 24 hours. Cheers & Happy Holidays!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
