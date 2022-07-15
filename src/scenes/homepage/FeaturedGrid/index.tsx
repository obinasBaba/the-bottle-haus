import React from 'react';
import s from './featuredgrid.module.scss';
import Image from 'next/image';

import Featured from './imgs/featured-big.png';
import Cognac from './imgs/cognack.png';
import Rum from './imgs/rum.png';
import Whisky from './imgs/whisky.png';
import Wine from './imgs/wine.png';
import Haus from './imgs/img.png';
import Haus2 from './imgs/img_1.png';
import Vodka from './imgs/vodka.png';
import Link from 'next/link';

const data = [
  { img: Featured, text: 'Featured' },
  { img: Cognac, text: 'Cognac' },
  { img: Rum, text: 'Rum' },
  { clr: 'lightcoral', text: 'More' },
  { clr: '#FE8029', text: 'Gin' },
  { img: Whisky, text: 'Whisky' },
  { img: Wine, text: 'Wine' },
  { img: Haus, text: 'Haus' },
  { clr: '#94C4C8', text: 'More' },
  { img: Haus2, text: 'Haus2' },
  { img: Vodka, text: 'Vodka' },
  { clr: 'teal', text: 'More' },
];

const FeaturedGrid = () => {
  return (
    <div className={s.container}>
      <div className="featured_grid_wrapper">
        <h1 className="title">
          Featured
          <span>Collections</span>
        </h1>

        <div className="grid_view">
          <div className="big">
            <Image src={Featured} alt={'grid image'} objectFit={'cover'} />
            {/*Champigh*/}
          </div>

          <div className="liqueur">
            <Image src={Haus} alt={'grid image'} objectFit={'cover'} />
            {/*liqueur*/}
          </div>

          <div className="wine">
            <Image src={Wine} alt={'grid image'} objectFit={'cover'} />
            {/*WIne*/}
          </div>

          {/*<div style={{  background: 'lightcoral' }} />*/}
          <Link href={'/'}>
            <a style={{ background: 'lightcoral' }}>more</a>
          </Link>

          <Link href={'/'}>
            <a style={{ background: '#FE8029' }}>Gin</a>
          </Link>

          <div className="vodka">
            <Image src={Vodka} alt={'grid image'} objectFit={'cover'} />
          </div>

          <div className="haus">
            <Image src={Haus2} alt={'grid image'} objectFit={'cover'} />

            {/*haus*/}
          </div>

          <div className="cognac">
            {/*coganac*/}
            <Image src={Cognac} alt={'grid image'} objectFit={'cover'} />
          </div>

          <Link href={'/'}>
            <a style={{ background: '#94C4C8' }}>Tequila</a>
          </Link>

          <div className="rum">
            <Image src={Rum} alt={'grid image'} objectFit={'cover'} />
            {/*rum*/}
          </div>

          <div className="whisky">
            <Image src={Whisky} alt={'grid image'} objectFit={'cover'} />
            {/*whisky*/}
          </div>

          <Link href={'/'}>
            <a style={{ background: 'teal' }}></a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGrid;
