import React, { memo } from 'react';
import s from './video.module.scss';
import SearchImg from '@/public/search-img.png';
import TabImg from '@/public/tab-img.png';
import DrinkImg from '@/public/drink-img.png';
import Image from 'next/image';

const data = [
  { title: 'Search', desc: '<p>1500+ bottles <br>to choose from</p>', img: SearchImg },
  { title: 'Tap', desc: '<p>Checkout in seconds <br>with express checkout</p>', img: TabImg },
  { title: 'Drink', desc: '<p>Delivered to your <br>door within days</p>', img: DrinkImg },
];

const VideoAd = () => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        {data.map(({ title, desc, img }) => (
          <div className="card" key={title}>
            <h1 className="title">{title}</h1>
            <div className="desc" dangerouslySetInnerHTML={{ __html: desc }} />
            <div className="art">
              <Image src={img} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(VideoAd);
