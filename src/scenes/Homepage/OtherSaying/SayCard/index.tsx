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
import AvatarBg from './avatar-bg.png';
import BoxBg from './box-bg.png';

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
    txt: 'Someone got this for me when I was pregnant so I would not feel left out of the fun and I loved it. It’s so good! And I had really been missing wine. Now it’s my go to gift for all my friends and sometimes I drink it still just because I love the taste.',
    name: 'Debora',
  },
  {
    img: Profile2,
    txt:
      'I like this a lot. It is mild but I am happy with it. It like flavors that are\n' +
      '          overwhelming or are too strong. I will definitely be buying this again.',
    name: 'Sara',
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.35,
    },
  },

  exit: {
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.55,
    },
  },
};

const SayCard = () => {
  const [idx, setIdx] = useState(0);
  const [activeQuote, setActiveQuote] = useState(peoples[0]);
  const savedCallback = useRef<any>(() => null);

  function next() {
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
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={s.container}>
      <IconButton
        className={clsx([s.btn, s.btn_lft])}
        color="primary"
        size="large"
        onClick={next}
        data-cursor="-opaque">
        <Image src={BLeft} alt="right bottle btn" priority/>
      </IconButton>

      <div className={s.box_bg}>
        <Image src={BoxBg} alt="testimonal background" />
      </div>

      <AnimatePresence exitBeforeEnter>
        <MotionParent
          className={s.text_container}
          key={activeQuote.img.src}
          variants={containerVariants}>
          <motion.div className={s.profile} variants={basicVariants} transition={basicTransition}>
            <div className={s.avatar_bg}>
              <Image src={AvatarBg} alt="avatar background image" />
            </div>

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

      <IconButton
        className={clsx([s.btn, s.btn_rht])}
        color="primary"
        size="large"
        onClick={prev}
        data-cursor="-opaque">
        <Image src={BRight} alt="right bottle btn" priority/>
      </IconButton>
    </div>
  );
};

export default SayCard;
