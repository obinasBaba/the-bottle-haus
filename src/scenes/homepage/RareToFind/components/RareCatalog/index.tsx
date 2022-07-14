import React from 'react';
import s from './rarecatalog.module.scss';
import { Button } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import MyWife from '@/public/tell-my-wife.png';
import Image from 'next/image';

const MyWifeImg = <Image src={MyWife} alt="i tell here investiment" />;

const RareCatalog = () => {
  const data = Array.from(new Array(12));

  return (
    <div className={s.container}>
      <div className="list">
        {data.map((product, idx) =>
          idx == 3 ? (
            <div className="wife" key={idx}>
              <Image
                src={MyWife}
                objectFit="contain"
                width="200px"
                alt="told my wife this is an investment"
              />
            </div>
          ) : (
            <ProductCard loading={true} key={idx} />
          ),
        )}
      </div>

      <p className="say">
        Whether you are sending a gift to someone special or simply just adding <br />
        to your collection, let The Bottle Haus be your one stop shop for <br /> everything rare.
      </p>

      <Button>Show All</Button>
    </div>
  );
};

export default RareCatalog;
