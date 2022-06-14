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

const FeaturedGrid = () => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <div className="big">
          <Image src={Featured} alt={'grid image'} objectFit={'contain'} />
          {/*Champigh*/}
        </div>

        <div className="liqueur">
          <Image src={Haus} alt={'grid image'} objectFit={'contain'} />
          {/*liqueur*/}
        </div>

        <div className="wine">
          <Image src={Wine} alt={'grid image'} objectFit={'contain'} />
          {/*WIne*/}
        </div>

        <div style={{ minWidth: '220px', height: '155px', background: 'lightcoral' }} />
        <div style={{ minWidth: '230px', height: '160px', background: 'orangered' }} />

        <div className="vodka">
          <Image src={Vodka} alt={'grid image'} objectFit={'contain'} />
        </div>

        <div className="haus">
          <Image src={Haus2} alt={'grid image'} objectFit={'contain'} />

          {/*haus*/}
        </div>

        <div className="cognac">
          {/*coganac*/}
          <Image src={Cognac} alt={'grid image'} objectFit={'contain'} />
        </div>

        <div style={{ minWidth: '210px', height: '230px', background: 'lightcoral' }} />

        <div className="rum">
          <Image src={Rum} alt={'grid image'} objectFit={'contain'} />
          {/*rum*/}
        </div>

        <div className="whisky">
          <Image src={Whisky} alt={'grid image'} objectFit={'contain'} />
          {/*whisky*/}
        </div>

        <div style={{ minWidth: '220px', height: '210px', background: 'teal' }} />
      </div>
    </div>
  );
};

export default FeaturedGrid;
