import React from 'react';
import s from './othersaying.module.scss';
import SayCard from '@/scenes/Homepage/OtherSaying/SayCard';
import { SceneTitle } from '@/scenes/Homepage/FeaturedCollection';
import FlowerGlass from './say-card-imgs/flower-glass.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { basicTransition } from '@/components/common/MotionItems';

const titleVariants = {
  initial: {
    y: '200%',
    // scale: 0.7,
    opacity: 0.2,
  },
  inView: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {},
};

const OtherSaying = () => {
  return (
    <motion.div
      className={s.container}
      initial="initial"
      whileInView="inView"
      viewport={{
        amount: 0.4,
        once: false,
      }}>
      <div className={s.flower_glass}>
        <div data-scroll={true} data-scroll-speed={-2} data-scroll-delay={0.05}>
          <Image src={FlowerGlass} alt="flower glass" />
        </div>
      </div>

      <motion.div className={s.wrapper}>
        <header>
          <motion.div variants={titleVariants} transition={basicTransition}>
            <SceneTitle title="What Others <span>Are Saying?</span>" />
          </motion.div>
        </header>

        <SayCard />
      </motion.div>
    </motion.div>
  );
};

export default OtherSaying;
