import React from 'react';
import ContactUsPage from '@/scenes/ContactUsPage';
import { GetStaticPropsContext } from 'next';
import commerce from '@lib/api/commerce';

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
  return <ContactUsPage />;
};

export default ContactUs;
