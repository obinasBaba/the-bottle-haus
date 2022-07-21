import React, { useState } from 'react';
import s from './slidshow.module.scss';
import Weller from './weller.png';
import Royal from './royal-resize.png';
import Blanton from './blanton.png';
import { Button } from '@mui/material';
import Image from 'next/image';
import Dots from '@/public//dots.svg';
import BottleLeft from '@/public/bottle-left.png';
import BottleRight from '@/public/bottle-right.png';
import { next, prev } from '@/util/helpers';
import Link from 'next/link';

const data = [
  {
    subTitle: 'haus of bourbon',
    title: 'Weller 12 Year',
    desc: `
          As part of the wheated bourbon family, this twelve year old W.L.
           Weller is aged far longer than most wheated bourbons.
           This offering is a smooth, easy-going and balanced offering
           with a beautiful deep bronze color.
        `,
    img: Weller,
    idx: 0,
    link: './product/wl-weller-single-barrel-kentucky-straight-bourbon-whiskey',
  },
  {
    subTitle: 'Lightning Fast Delivery',
    title: 'Crown Royal Peach',
    desc: `
          To create this extraordinary blend, crown royal whiskies are carefully
          selected by their  master blender and infused with the
          juicy flavor of fresh Georgia peaches
        `,
    img: Royal,
    idx: 1,
    link: './product/crown-royal-peach-whisky',
  },
  {
    subTitle: 'Haus of Blanton',
    title: "Blanton's Black",
    desc: `
          Blanton’s Black Edition Bourbon Whiskey takes Blanton’s
          proven distilling process and takes it up several notches.
          The method used to craft this special edition bottle stays true to his traditional ways.
        `,
    img: Blanton,
    idx: 2,
    link: './product/eagle-rare-10-year-old-kentucky-straight-bourbon-whiskey-2',
  },
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
            <h1 className="title">
              {slide.title}
              <span>in Stock</span>
            </h1>
            <p className="desc">{slide.desc}</p>
            <Link href={slide.link}>
              <a>
                <Button size="large" variant="outlined">
                  Shop Now
                </Button>
              </a>
            </Link>
          </div>
        </div>

        <div className="bottle">
          <div className="bottle_img">
            <Image src={slide.img} alt={'Weller bottle'} />
          </div>
        </div>
      </div>
      <div className={s.controller}>
        <div className="slide_info">
          <span>Next Slide</span>
          <p>Crown Royal Peach in stoke</p>
        </div>

        <div className="buttons">
          <div className="prev" onClick={() => setSlide(data[prev(slide.idx, data.length)])}>
            <Image src={BottleLeft} alt="prev button" />
          </div>
          <div className="next" onClick={() => setSlide(data[next(slide.idx, data.length)])}>
            <Image src={BottleRight} alt="next button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
