import React from 'react';
import s from './collectionsidenav.module.scss';
import { Collection } from '@/schema';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useLocomotiveScroll } from '@/context/LocoMotive';

type CollectionSideNavProps = {
  collections: Collection[];
};

const CollectionSideNav: React.FC<CollectionSideNavProps> = ({ collections }) => {
  const router = useRouter();
  const { scrollDirection } = useLocomotiveScroll();

  return (
    <div
      className={s.container}
      data-scroll-sticky={true}
      data-scroll={true}
      data-scroll-target="#fixed-target"
      data-scroll-offset="-%10, %20">
      <motion.div className={s.wrapper}>
        {collections.map(({ name, backgroundImage, slug }, idx) => (
          <Link href={`/collection/${slug}`} key={name}>
            <a>
              <div className={clsx(s.item, router.asPath.endsWith(slug) && [s.active])} key={name}>
                <p className={s.col_name}>{name} </p>
                <div className={s.collection_img}>
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
      </motion.div>
    </div>
  );
};

export default CollectionSideNav;
