import React, { useEffect } from 'react';
import s from './featuredcollection.module.scss';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { useSearch } from '@/SWRHooksAPI';

const FeaturedCollection = () => {
  const { data, error, isLoading } = useSearch({
    first: 12,
    filter: { collections: ['Q29sbGVjdGlvbjoz'] },
  });

  useEffect(() => {
    console.log('data: ', data, 'error: ', error, isLoading);
  }, [data, error, isLoading]);

  useEffect(() => {
    if (data?.found) {
    }
  }, [data]);

  return (
    <div className={s.container}>
      <div className="header">
        <h1>
          Shop <br />
          <span>Whiskey</span>
        </h1>

        <Button text="Show All" />
      </div>

      <div className="whiskey-wrapper">
        {data?.products.map((product) => (
          <ProductCard key={product.id} products={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollection;
