import React, { useState } from 'react';
import s from './slidshow.module.scss';
import Weller from './weller.png';
import { Button } from '@mui/material';
import Image from 'next/image';
import Dots from '@/public//dots.svg';
import Bottle from '@/public/bottle-left.png';

const data = [
  {
    subTitle: 'haus of bourbon',
    title: 'Weller 12 Year <span>in Stock</span>',
    desc: `
          As part of the wheated bourbon family, this twelve year old W.L.
           Weller is aged far longer than most wheated bourbons.
           This offering is a smooth, easy-going and balanced offering
           with a beautiful deep bronze color.
        `,
    img: Weller,
  },
  {},
];

const SlideShow = () => {
  const [slide, setSlide] = useState(data[0]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        <div className="dots">
          <Image src={Dots} alt="dots" />
        </div>

        <div className="text">
          <div className="text_wrapper">
            <p className="subtitle">{slide.subTitle}</p>
            <h1 className="title" dangerouslySetInnerHTML={{ __html: slide.title! }} />
            <p className="desc">{slide.desc}</p>
            <Button>Shop Now</Button>
          </div>
        </div>

        <div className="bottle">
          <div className="bottle_img">
            <Image src={Weller} alt={'Weller bottle'} />
          </div>
        </div>
      </div>
      <div className={s.controller}>
        <div className="slide_info">
          <span>Next Slide</span>
          <p>Crown Royal Peach in stoke</p>
        </div>

        <div className="buttons">
          <div className="prev">
            <Image src={Bottle} alt="prev button" />
          </div>
          <div className="next">
            <Image src={Bottle} alt="next button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
