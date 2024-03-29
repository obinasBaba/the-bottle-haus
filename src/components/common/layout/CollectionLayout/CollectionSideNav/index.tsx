import React, { useEffect } from 'react';
import s from './collectionsidenav.module.scss';
import { Collection } from '@lib/types';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { MotionParent } from '@/components/common/MotionItems';
import { motion, MotionValue, useAnimation, Variants } from 'framer-motion';
import { debounce } from '@mui/material';
import Img from '@/public/drink-img.png';
import { useAppInfo } from '@/context/MotionValuesContext';

const fallback = [
  { name: 'one', backgroundImage: { url: Img.src } },
  {
    name: 'two',
    backgroundImage: { url: Img.src },
  },
  { name: 'three', backgroundImage: { url: Img.src } },
];

type CollectionSideNavProps = {
  collections: Collection[];
  scrolledTop: MotionValue<boolean>;
};

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },

  exit: {
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
  exit: {
    opacity: 0,
  },
};

const wrapperVariants = {
  up: {
    y: '7%',
  },
  down: {
    y: '0%',
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

const CollectionSideNav: React.FC<CollectionSideNavProps> = ({ collections, scrolledTop }) => {
  const router = useRouter();
  const pathname = usePathname();
  const control = useAnimation();
  const { appBarScrollState } = useAppInfo();

  useEffect(() => {
    appBarScrollState.on(
      'change',
      debounce((v) => {
        // if (0.11 > yProgress.get()) return control.start('up');
        if (scrolledTop.get()) return;

        if (v == 'up') {
          control.start('up');
        } else if (v == 'down') {
          control.start('down');
        }
      }, 200),
    );

    return () => {
      control.stop();
    };
  }, []);

  useEffect(() => {
    scrolledTop.on('change', (v) => {
      if (v) {
        control.start('down');
      }
    });
  }, []);

  return (
    <motion.div
      className={s.container}
      data-scroll-sticky={true}
      data-scroll={true}
      data-scroll-target="#product-catalog"
      data-scroll-offset="-100, 100"
      variants={{}}>
      <motion.div variants={wrapperVariants} animate={control} transition={wrapperTrans}>
        <MotionParent className={s.wrapper} variants={containerVariants}>
          {collections.map(({ title, handle, backgroundImage }, idx) => (
            <motion.div key={handle} variants={itemVariants} transition={transition}>
              <Link href={`/collection/${handle}`}>
                {pathname?.endsWith(handle) && (
                  <motion.div className={s.layout_overlay} layoutId="active-bg" />
                )}

                <div className={clsx(s.item)} key={title} data-cursor="-opaque">
                  <p className={s.col_name}>{title} </p>
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
              </Link>
            </motion.div>
          ))}
        </MotionParent>
      </motion.div>
    </motion.div>
  );
};

export default CollectionSideNav;
