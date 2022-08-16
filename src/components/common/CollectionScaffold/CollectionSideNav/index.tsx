import React from 'react';
import s from './collectionsidenav.module.scss';
import { Collection } from '@/schema';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { MotionParent } from '@/components/common/MotionItems';
import { motion, useAnimation, useTransform, Variants } from 'framer-motion';
import { debounce } from '@mui/material';

type CollectionSideNavProps = {
  collections: Collection[];
};

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};
const itemVariants = {
  initial: {
    opacity: 0,
    x: '-10%',
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

const wrapperVariants = {
  up: {
    y: '0%',
  },
  down: {
    y: '-15%',
  },
};

const transition = {
  duration: 0.8,
  ease: [0.6, 0.01, 0, 0.9],
};

const wrapperTrans = {
  duration: 0.65,
  ease: [0.6, 0.01, 0, 0.9],
};

const CollectionSideNav: React.FC<CollectionSideNavProps> = ({ collections }) => {
  const router = useRouter();
  const control = useAnimation();
  const { scrollDirection } = useLocomotiveScroll();

  useTransform(
    scrollDirection,
    debounce((v) => {
      if (v == 'up') {
        control.start('up');
      } else if (v == 'down') {
        control.start('down');
      }
    }, 600),
  );

  return (
    <div
      className={s.container}
      data-scroll-sticky={true}
      data-scroll={true}
      data-scroll-target="#fixed-target"
      data-scroll-offset="-%15, %20">
      <motion.div variants={wrapperVariants} animate={control} transition={wrapperTrans}>
        <MotionParent className={s.wrapper} variants={containerVariants}>
          {collections.map(({ name, backgroundImage, slug }, idx) => (
            <motion.div key={name} variants={itemVariants} transition={transition}>
              <Link href={`/collection/${slug}`}>
                <a>
                  {router.asPath.endsWith(slug) && (
                    <motion.div className={s.active} layoutId="active-bg" />
                  )}

                  <div className={clsx(s.item)} key={name}>
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
            </motion.div>
          ))}
        </MotionParent>
      </motion.div>
    </div>
  );
};

export default CollectionSideNav;
