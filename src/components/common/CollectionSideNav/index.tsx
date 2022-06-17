import React from 'react';
import s from './collectionsidenav.module.scss';
import { Collection } from '@/schema';
import Image from 'next/image';

type CollectionSideNavProps = {
  collections: Collection[];
};

const CollectionSideNav: React.FC<CollectionSideNavProps> = ({ collections }) => {
  return (
    <div className={s.container}>
      {collections.map(({ name, backgroundImage }, idx) => (
        <div className="item" key={name}>
          <p className="col_name">{name}</p>
          <div className="collection_img">
            {backgroundImage?.url && (
              <Image
                src={backgroundImage.url}
                alt={backgroundImage?.alt || 'collection image'}
                width="100%"
                height="100%"
                objectFit="contain"
                unoptimized
                layout={'fill'}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionSideNav;
