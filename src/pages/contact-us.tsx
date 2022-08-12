import React from 'react';
import ContactUsPage from '@/scenes/ContactUsPage';
import { GetStaticPropsContext } from 'next';
import commerce from '@lib/api/commerce';
import { MotionParent } from '@/components/common/MotionItems';
import Head from 'next/head';

export async function getStaticProps(arg: GetStaticPropsContext) {
  const allCollections = await commerce.getSiteInfo({});

  return {
    props: {
      collections: allCollections.collections,
    },
    revalidate: 60,
  };
}

const ContactUs = () => {
  return (
    <MotionParent>
      <Head>
        <title>contact-us</title>
        <meta name="contact-us page" />
      </Head>
      <ContactUsPage />
    </MotionParent>
  );
};

export default ContactUs;
