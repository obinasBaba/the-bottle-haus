import React, { useState } from 'react';
import s from './collectionsidenav.module.scss';

const CollectionSideNav = () => {
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
      {data.map((name, idx) => (
        <div className="item" key={name}>
          <p className="col_name">{name}</p>
        </div>
      ))}
    </div>
  );
};

export default CollectionSideNav;
