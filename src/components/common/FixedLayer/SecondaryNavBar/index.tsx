import React, { useState } from 'react';
import Link from 'next/link';
import { Collection } from '@/schema';
import s from './secondarynav.module.scss';

const SecondaryNavBar = ({ collections }: { collections: Collection[] }) => {
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
      <div className={s.wrapper}>
        {(collections || data).map(({ name, slug }) => (
          <Link href={`/collection/${slug}`} key={name}>
            <a>
              <p key={name} className={s.linkText}>
                {name}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavBar;
