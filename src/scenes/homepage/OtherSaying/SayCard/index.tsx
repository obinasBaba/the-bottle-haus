import React from 'react';
import Image from 'next/image';
import Bourbon from '@/public/whisky-review/kiss.png';
import Quote from '@/public/quotes.png';
import s from './saycard.module.scss';

const SayCard = () => {
  return (
    <div className={s.container}>
      <div className="bottle">
        <div className="bottle_img">
          <Image src={Bourbon} alt="bourbon" />
        </div>
        <p className="brand">
          kentucky straight bourbon <br /> whiskey
        </p>
      </div>

      <div className="line" />

      <div className="comment">
        <div className="quote_wrapper">
          <Image src={Quote} alt="quote pic" />
        </div>
        <p className="quote">
          I like this a lot. It is mild but I am happy with it. I don&apos;t like flavors that are
          overwhelming or are too strong. I will definitely be buying this again.
        </p>
        <p className="name">- Miller Geller</p>
      </div>
    </div>
  );
};

export default SayCard;
