import React, { useEffect } from 'react';
import s from './featuredcollection.module.scss';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { useSearch } from '@/SWRHooksAPI';

const FeaturedCollection = () => {
  const data = new Array(16);
  const {
    data: d,
    error,
    isLoading,
  } = useSearch({
    categoryId: 'Q2F0ZWdvcnk6MjQ=',
  });

  useEffect(() => {
    console.log('data: ', d, 'error: ', error, isLoading);
  }, [d, error, isLoading]);

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
