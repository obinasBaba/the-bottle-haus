import React from 'react';
import s from './featuredcollection.module.scss';
import { Button } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

const FeaturedCollection = ({ data }: { data: Product[] }) => {
  return (
    <div className={s.container}>
      <div className="header">
        <h1>
          Shop
          <span>Whiskey</span>
        </h1>

        <Button variant="contained" size="large">
          Show All
        </Button>
      </div>

      <div className="whiskey-wrapper">
        {data.map((product, idx) => (
          <ProductCard key={product?.id || idx} product={product} loading={!data} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollection;
