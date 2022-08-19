import React from 'react';

import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '@mui/material';
import s from './glassview.module.scss';

import Leaf from './media/side-leaf.png';
import LeafRight from './media/right-leaf.png';
import Bg2 from './media/image 27.png';
import Glass from './media/bott 1.png';
import Bubble from './media/bubbles.png';

const texture = [
  { name: 'Bone Dry', level: 3 },
  { name: 'Bone Dry', level: 3 },
  { name: 'Bone Dry', level: 3 },
  {
    name: 'Bone Dry',
    level: 3,
  },
];

const GlassView = () => {
  return (
    <div className={s.container}>
      <div className={s.free_layer}>
        <div className={s.bg}>
          <Image src={Bg2} alt="scene background" layout="fill" />
        </div>

        <div className={s.right_leaf}>
          <Image src={Leaf} alt="scene background" />
        </div>

        <div className={s.bubble}>
          <Image src={Bubble} alt="scene background" />
        </div>

        <div className={s.left_leaf}>
          <Image src={LeafRight} alt="scene background" />
        </div>
      </div>

      <div className={s.huge_txt} data-scroll={true} data-scroll-delay={2} data-scroll-speed={-1}>
        <h1>Golden Numbers</h1>
      </div>

      <div className={s.content}>
        <div className={s.hor}>
          <div className={s.left_txt}>
            <div>
              <h4> Our Legacy </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci corporis culpa
                ducimus molestiae necessitatibus nostrum nulla omnis quos reiciendis tempora.
              </p>

              <Button variant="outlined" size="large">
                Shop Now
              </Button>
            </div>
          </div>

          <div className={s.glass}>
            <Image src={Glass} alt="Glass of Whisky" />
          </div>

          <div className={s.right_txt}>
            <h4>The Texture</h4>

            <div className={s.texture}>
              {texture.map(({ name, level }, idx) => (
                <div className={s.t_item} key={idx}>
                  <p>{name}</p>
                  <div className={s.level}>
                    {Array.from(new Array(5)).map((v, idx) => (
                      <span key={idx} className={clsx([idx <= level ? s.thick : s.thin])} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.bottom_txt}>
          <div>
            <small className={s.amount}>100%</small>
            <p>Available On Stock</p>
          </div>
          <div>
            <small className={s.amount}>100%</small>
            <p>Available On Stock</p>
          </div>
          <div>
            <small className={s.amount}>100%</small>
            <p>Available On Stock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassView;
