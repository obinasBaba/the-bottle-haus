import React from 'react';
import ContactUsPage from '@/scenes/ContactUsPage';
import { MotionParent } from '@/components/common/MotionItems';
import Head from 'next/head';
import { pageTransition } from '@/scenes/Homepage';

const ContactUs = () => {
  return (
    <MotionParent variants={{}} transition={pageTransition}>
      <Head>
        <title>Juvi . Contact-us</title>
        <meta name="contact-us page" />
      </Head>
      <ContactUsPage />
    </MotionParent>
  );
};

export default ContactUs;
