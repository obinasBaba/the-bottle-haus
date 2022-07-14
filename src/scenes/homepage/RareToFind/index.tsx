import React from 'react';
import s from './raretofind.module.scss';
import Image from 'next/image';
import RareImage from '@/public/rare.png';
import TextCrown from '@/public/text-crown.png';
import RareCatalog from './components/RareCatalog';
import { Product } from '@/types/product';

const RareToFind = ({ data }: { data: Product[] }) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className="rare_head">
          <div className={s.bg_txt}>
            <h1>RARE & HARD TO FIND</h1>
            <div className="crown">
              <Image src={TextCrown} alt="crown" />
            </div>
          </div>

          <p className="txt_left">
            The Bottle Haus&apos;s team of
            <br />
            connoisseurs have done all the hard
            <br /> work for you.
          </p>

          <Image src={RareImage} alt="rare to find drink image" />

          <div className="txt_right">
            <p className="title">Louis XIII Cognac</p>
            <span>The oldest being over 100 years old</span>
          </div>
        </div>

        <RareCatalog data={data} />
      </div>
    </div>
  );
};

export default RareToFind;
