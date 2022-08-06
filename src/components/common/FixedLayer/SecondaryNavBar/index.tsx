import React, { useState } from 'react';
import Link from 'next/link';
import { getToken } from '@/util';
import { Collection } from '@/schema';
import s from './secondarynav.module.scss';

const token = getToken(); // accessing the cookie via js-cookie

const fetcher = async ({ query, variables }: any) => {
  const res = await fetch('https://bottlehaus.saleor.cloud/graphql/', {
    method: 'POST',
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return res;
};

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
        {(collections || data).map(({ name, slug = '/' }) => (
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
