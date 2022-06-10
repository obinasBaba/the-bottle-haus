import React from 'react';
import s from './othersaying.module.scss';
import Image from 'next/image';
import Quote from '@/public/quotes.png';
import Bourbon from '@/public/whisky-review/kiss.png';
import SayCard from '@homepage/OtherSaying/SayCard';
import Marquee from 'react-fast-marquee';

const OtherSaying = () => {
  return (
    <div className={s.container}>
      <header>
        <h1 className="title">
          What Others <br /> <span>Are Saying?</span>
        </h1>
      </header>

      <div className="marquee_wrap">
        <Marquee pauseOnHover={true} speed={140}>
          <SayCard />
          <SayCard />
          <SayCard />
          <SayCard />
          <SayCard />
          <SayCard />
        </Marquee>
      </div>
    </div>
  );
};

export default OtherSaying;
