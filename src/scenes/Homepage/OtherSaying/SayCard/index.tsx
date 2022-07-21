import React from 'react';
import Image from 'next/image';
import Quote from '@/public/quotes.png';
import s from './saycard.module.scss';
import { Avatar } from '@mui/material';

import Profile from './img.png';

const SayCard = () => {
  return (
    <div className={s.container}>
      <div className="profile">
        <Avatar alt="Remy Sharp" src={Profile.src} sx={{ width: 106, height: 106 }} />
      </div>

      <div className="comment">
        <div className="quote_wrapper">
          <Image src={Quote} alt="quote pic" />
        </div>
        <div className="hor">
          <p className="quote">
            I like this a lot. It is mild but I am happy with it. I don&apos;t like flavors that are
            overwhelming or are too strong. I will definitely be buying this again.
          </p>
        </div>
        <p className="name">- Miller Geller</p>
      </div>
    </div>
  );
};

export default SayCard;
