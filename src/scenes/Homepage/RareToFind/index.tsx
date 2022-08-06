import React from 'react';
import Image from 'next/image';
import RareImage from '@/public/rare.png';
import TextCrown from '@/public/text-crown.png';
import { Product } from '@/types/product';
import s from './raretofind.module.scss';
import RareCatalog from '@/scenes/Homepage/RareToFind/components/RareCatalog';

const RareToFind = ({ data }: { data: Product[] }) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <header className={s.header}>
          <div className={s.bg_txt}>
            <h1>RARE & HARD TO FIND</h1>

            <div className={s.crown}>
              <Image src={TextCrown} alt="crown" />
            </div>
          </div>

          <p className={s.txt_left}>
            The Bottle Haus&apos;s team of
            <br />
            connoisseurs have done all the hard
            <br /> work for you.
          </p>

          <Image src={RareImage} alt="rare to find drink image" />

          <div className={s.txt_right}>
            <p className={s.title}>Louis XIII Cognac</p>
            <span>The oldest being over 100 years old</span>
          </div>
        </header>

        <RareCatalog data={data} />
      </div>
    </div>
  );
};

export default RareToFind;
