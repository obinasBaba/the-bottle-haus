import React from 'react';
import s from './othersaying.module.scss';
import SayCard from '@/scenes/Homepage/OtherSaying/SayCard';
import { IconButton } from '@mui/material';
import { KeyboardArrowLeftTwoTone, KeyboardArrowRightTwoTone } from '@mui/icons-material';

const OtherSaying = () => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <header>
          <h1 className="title">
            What Others
            <span>Are Saying?</span>
          </h1>
        </header>

        <div className="marquee_wrap">
          <IconButton className="btn" color="primary" size="large">
            <KeyboardArrowLeftTwoTone />
          </IconButton>

          <SayCard />

          <IconButton className="btn" color="primary" size="large">
            <KeyboardArrowRightTwoTone />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default OtherSaying;
