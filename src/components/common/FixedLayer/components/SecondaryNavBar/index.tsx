import React, { useState } from 'react';
import s from './secondarynav.module.scss';

const SecondaryNavBar = () => {
  const [data, setData] = useState([
    'All Product',
    'Whiskey',
    'Alcohol',
    'Wine',
    'Celebrity Spirits',
    'Haus Bundles',
    'Barrel Picks',
    'Corporate Gifting',
  ]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        {data.map((title) => (
          <div key={title} className={'item'}>
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavBar;
