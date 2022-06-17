import React, { useEffect } from 'react';
import s from './collectionpage.module.scss';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';

const CollectionPage = () => {
  const router = useRouter();
  const { collection, filter } = router.query;

  return (
    <div className={s.container}>
      <header>
        <h1 className="title">Tequila</h1>
        <div className="filter">
          <Button text="Price" />
          <Button text="Best Selling" />
          <Button text="Sort by" />
        </div>
      </header>

      <div className="list">
        {Array.from(new Array(12)).map((_, idx) => (
          <ProductCard loading={true} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
