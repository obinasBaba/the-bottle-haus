import React from 'react';
import s from './horizontalmarqee.module.scss';
import Img2 from './img.png';
import Img3 from './img_1.png';
import Img4 from './img_2.png';
import Img5 from './img_3.png';
import Img6 from './img_4.png';
import Img7 from './img_5.png';
import Img8 from './img_6.png';
import Img9 from './img_7.png';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const imgs = [Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9];

//marquee

const HorizontalMarquee = () => {
  return (
    <div className={s.container}>
      <Marquee className={s.marqueeWrapper} gradientColor={[246, 246, 246]}>
        {imgs.map((img) => (
          <div className={s.illustration} key={img.src}>
            <Image src={img} alt="marquee img" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default HorizontalMarquee;
