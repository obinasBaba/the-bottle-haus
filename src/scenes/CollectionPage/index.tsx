import React from 'react';
import s from './collectionpage.module.scss';
import { useRouter } from 'next/router';

const CollectionPage = () => {
  const { query } = useRouter();

  return <div className={s.container}>{JSON.stringify(query)}</div>;
};

export default CollectionPage;
