import React from 'react';
import Image from 'next/image';
import RareImage from '@/public/rare.png';
import TextCrown from '@/public/text-crown.png';
import { Product } from '@/lib/types';
import s from './raretofind.module.scss';
import RareCatalog from '@/scenes/Homepage/RareToFind/components/RareCatalog';
import { motion } from 'framer-motion';
import { basicTransition } from '@/components/common/MotionItems';

import LeftBottom from './left-bottom.png';
import RightTop from './right-top.png';

const crownVariants = {
  initial: {
    y: '30%',
    scale: 0.7,
    opacity: 0,
  },
  inView: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {},
};

const RareToFind = ({ data }: { data: Product[] }) => {
  return (
    <div className={s.container} id="rare-to-find">
      <div
        className={s.bg}
        data-scroll={true}
        data-scroll-target="#rare-to-find"
        data-scroll-sticky={true}>
        <div
          className={s.left_bottom}
          data-scroll={true}
          data-scroll-speed="-.4"
          data-scroll-delay=".05">
          <Image src={LeftBottom} alt="left-bottom art" />
        </div>

        <div
          className={s.right_top}
          data-scroll={true}
          data-scroll-speed="-.4"
          data-scroll-delay=".05">
          <Image src={RightTop} alt="right-top art" />
        </div>
      </div>

      <div className={s.wrapper}>
        <motion.header
          className={s.header}
          initial="initial"
          animate="animate"
          exit="exit"
          whileInView="inView"
          viewport={{
            amount: 0.4,
            once: true,
          }}>
          <div className={s.bg_txt}>
            <h1>RARE & HARD TO FIND</h1>

            <motion.div className={s.crown} variants={crownVariants} transition={basicTransition}>
              <Image src={TextCrown} alt="crown" />
            </motion.div>
          </div>

          <p className={s.txt_left}>
            The Bottle Haus&apos;s team of
            <br />
            connoisseurs have done all the hard
            <br /> work for you.
          </p>

          <motion.div variants={crownVariants} transition={basicTransition}>
            <Image src={RareImage} alt="rare to find drink image" />
          </motion.div>

          <div className={s.txt_right}>
            <p className={s.title}>Louis XIII Cognac</p>
            <span>The oldest being over 100 years old</span>
          </div>
        </motion.header>

        <RareCatalog data={data.slice(0, 12)} />
      </div>
    </div>
  );
};

export default RareToFind;
