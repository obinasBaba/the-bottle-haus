import React from 'react';
import s from './collectionsidenav.module.scss';
import { Collection } from '@/schema';
import Image from 'next/image';
import Link from 'next/link';

type CollectionSideNavProps = {
  collections: Collection[];
};

const CollectionSideNav: React.FC<CollectionSideNavProps> = ({ collections }) => {
  return (
    <div className={s.container}>
      {collections.map(({ name, backgroundImage, slug }, idx) => (
        <Link href={`/collection/${slug}`} key={name}>
          <a>
            <div className="item" key={name}>
              <p className="col_name">{name}</p>
              <div className="collection_img">
                {backgroundImage?.url && (
                  <Image
                    src={backgroundImage.url}
                    alt={backgroundImage?.alt || 'collection image'}
                    objectFit="contain"
                    layout="fill"
                  />
                )}
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default CollectionSideNav;
