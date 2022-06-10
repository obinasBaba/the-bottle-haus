import React from 'react';
import Head from 'next/head';
import s from './Home.module.scss';
import Hero from './Hero';
import VideoAd from '@homepage/VideoAd';
import FeaturedCollection from '@homepage/FeaturedCollection';
import RareToFind from '@homepage/RareToFind';
import OtherSaying from '@homepage/OtherSaying';
import SlideShow from '@homepage/SlideShow';

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
      {/*<FeaturedCollection />*/}
      <RareToFind />
      <OtherSaying />
      <SlideShow />
    </div>
  );
};

export default HomePage;
