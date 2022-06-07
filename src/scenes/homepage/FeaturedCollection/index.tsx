import React from 'react';
import s from './featuredcollection.module.scss';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';

const FeaturedCollection = () => {
  const data = new Array(16);

  return (
    <div className={s.container}>
      <div className="header">
        <h1>
          Shop <br />
          <span>Whiskey</span>{' '}
        </h1>

        <Button text="Show All" />
      </div>

      <div className="whiskey-wrapper">{/*{data.map(({}) => <ProductCard/>)}*/}</div>
    </div>
  );
};

export default FeaturedCollection;
