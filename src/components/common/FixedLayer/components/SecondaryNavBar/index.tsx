import React, { useEffect, useState } from 'react';
import s from './secondarynav.module.scss';
import Link from 'next/link';
import { getToken } from '@/util';
import * as query from '@/util/queries';

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

  /*  useEffect(() => {
    fetcher({ query: query.CollectionMany, variables: {} }).then((r) => console.log('result: ', r));
  }, []);*/

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
