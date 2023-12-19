import React from 'react';
import s from './rarecatalog.module.scss';
import { Button } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import MyWife from '@/public/tell-my-wife.png';
import Image from 'next/image';
import { Product } from '@/lib/types';
import Link from 'next/link';

const MyWifeImg = <Image src={MyWife} alt="i tell here investiment" />;

const RareCatalog = ({ data }: { data: Product[] }) => {
  // const data = Array.from(new Array(12));

  return (
    <div className={s.container}>
      <div className={s.list}>
        {data.map((product, idx) =>
          idx == 3 ? (
            <div className={s.wife} key={product.id}>
              <Image
                src={MyWife}
                fill
                alt="told my wife this is an investment"
              />
            </div>
          ) : (
            <ProductCard product={product} loading={!data} key={product.id} />
          ),
        )}
      </div>

      <p className={s.say}>
        Whether you are sending a gift to someone special or simply just adding to your collection,
        let The Bottle Haus be your one stop shop for everything rare.
      </p>

      <Link href="/collection/rare-hard-to-find">
        <Button size="large" variant="contained" data-cursor="-opaque">
          Show All
        </Button>
      </Link>
    </div>
  );
};

export default RareCatalog;
