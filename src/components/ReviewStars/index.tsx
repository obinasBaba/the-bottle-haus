import React from 'react';
import s from './reviewstar.module.scss';

const ReviewStars: React.FC<{ star: number }> = ({ star }) => {
  return (
    <div className={s.container}>
      {Array.from(new Array(star)).map((_, idx) => (
        <span key={idx} />
      ))}
    </div>
  );
};

export default ReviewStars;
