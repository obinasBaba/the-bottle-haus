import React from 'react';
import s from './preview.module.scss';
import data from '@/public/product-review.json';
import ReviewStars from '@/components/ReviewStars';

const ProductReview = () => {
  return (
    <div className={s.container}>
      <header>
        <p className="subtitle"> What our customers</p>
        <h1 className="title">Are Saying</h1>
      </header>

      <div className="review_list">
        {data.map(({ title, name, date, quote }, idx) => (
          <div className="review_item" key={name}>
            <ReviewStars star={5} />
            <p>{title}</p>
            <p className="quote">{quote}</p>
            <h3>{name}</h3>
            <p className="date">{date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
