import React, { useState } from 'react';
import s from './secondarynav.module.scss';
import Link from 'next/link';

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
          <Link href="/" key={title}>
            <a>
              <div key={title} className={'item'}>
                {title}
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavBar;
