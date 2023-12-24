'use client';

import React from 'react';
import NotFoundPage from '@/scenes/NotFoundPage';
import { MotionParent } from '@/components/common/MotionItems';
import Head from 'next/head';

const PageNotFound = () => {
  return (
    <MotionParent>
      <Head>
        <title>page not found</title>
        <meta name="page not found page" />
      </Head>
      <NotFoundPage />
    </MotionParent>
  );
};

export default PageNotFound;
