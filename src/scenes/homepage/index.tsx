import React from 'react';
import Head from 'next/head';
import s from './Home.module.scss';
import Hero from './Hero';
import VideoAd from '@homepage/VideoAd';

const HomePage = () => {
  return (
    <div className={s.container}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="the bottle haus homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <VideoAd />
    </div>
  );
};

export default HomePage;
