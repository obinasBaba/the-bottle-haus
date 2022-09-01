import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from './saycard.module.scss';
import { Avatar, IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import Profile from './img.png';
import Profile1 from '../say-card-imgs/img.png';
import Profile2 from '../say-card-imgs/img_1.png';
import BRight from '@/public/bottle-right.png';
import BLeft from '@/public/bottle-left.png';
import Quote from '@/public/quotes.png';

import { basicTransition, basicVariants, MotionParent } from '@/components/common/MotionItems';
import clsx from 'clsx';

const peoples = [
  {
    img: Profile,
    txt:
      "I like this a lot. It is mild but I am happy with it. I don't like flavors that are\n" +
      '          overwhelming or are too strong. I will definitely be buying this again.',
    name: 'Miller Geller',
  },
  {
    img: Profile1,
    txt:
      'I like this a lot. It is mild but I am happy with it.' +
      "  I don't like flavors that are overwhelming or are too strong. I will definitely be buying this again.",
    name: 'lsdj',
  },
  {
    img: Profile2,
    txt:
      'I like this a lot. It is mild but I am happy with it. I don&apos;t like flavors that are\n' +
      '          overwhelming or are too strong. I will definitely be buying this again.',
    name: 'lk;asdf',
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.25,
    },
  },
};

const SayCard = () => {
  const [idx, setIdx] = useState(0);
  const [activeQuote, setActiveQuote] = useState(peoples[0]);
  const savedCallback = useRef<any>(() => null);

  function next() {
    console.log('idx: ', idx);

    const nxtIdx = idx + 1 <= peoples.length - 1 ? idx + 1 : 0;
    setActiveQuote(peoples[nxtIdx]);
    setIdx(nxtIdx);
  }

  function prev() {
    const prvIdx = idx - 1 >= 0 ? idx - 1 : peoples.length - 1;
    setActiveQuote(peoples[prvIdx]);
    setIdx(prvIdx);
  }

  useEffect(() => {
    savedCallback.current = next;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      savedCallback.current();
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={s.container}>
      <IconButton className={clsx([s.btn, s.btn_lft])} color="primary" size="large" onClick={next}>
        <Image src={BLeft} alt="right bottle btn" />
      </IconButton>

      <AnimatePresence exitBeforeEnter>
        <MotionParent
          className={s.text_container}
          key={activeQuote.img.src}
          variants={containerVariants}>
          <motion.div className={s.profile} variants={basicVariants} transition={basicTransition}>
            <Avatar alt="Remy Sharp" src={activeQuote.img.src} sx={{ width: 106, height: 106 }} />
          </motion.div>

          <motion.div className={s.comment} variants={basicVariants} transition={basicTransition}>
            <div className={s.quote_icon}>
              <Image src={Quote} alt="quote pic" />
            </div>
            <p className={s.text}>{activeQuote.txt}</p>
            <p className={s.name}>- {activeQuote.name}</p>
          </motion.div>
        </MotionParent>
      </AnimatePresence>

      <IconButton className={clsx([s.btn, s.btn_rht])} color="primary" size="large" onClick={prev}>
        <Image src={BRight} alt="right bottle btn" />
      </IconButton>
    </div>
  );
};

export default SayCard;
