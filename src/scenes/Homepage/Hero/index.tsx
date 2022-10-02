import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MotionParent } from '@/components/common/MotionItems';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Button, debounce, IconButton } from '@mui/material';
import { KeyboardArrowLeftTwoTone, KeyboardArrowRightTwoTone } from '@mui/icons-material';
import s from './hero.module.scss';
import clsx from 'clsx';
import {
  containerVariants,
  images,
  imageVariants,
  textContainerVariants,
  textItemVariants,
  textTransition,
  transition,
} from '@/scenes/Homepage/Hero/resources';
import Link from 'next/link';
import { useAppContext } from '@/context/app';
import { useAppInfo } from '@/context/MotionValuesContext';

let touched = false;

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const savedCallback = useRef<any>();
  const { PageAnimationEvent, PageAnimationController } = useAppInfo();

  const { lightenNavBar, darkenNavBar } = useAppContext();

  function next() {
    const nxtIdx = idx + 1 <= images.length - 1 ? idx + 1 : 0;
    setSelectedImg(images[nxtIdx]);
    setIdx(nxtIdx);
  }

  function prev() {
    const prvIdx = idx - 1 >= 0 ? idx - 1 : images.length - 1;
    setSelectedImg(images[prvIdx]);
    setIdx(prvIdx);
  }

  useEffect(() => {
    savedCallback.current = next;
  });

  useEffect(() => {
    function tick() {
      if (!touched) savedCallback.current();
      touched = false;
    }

    const interval = setInterval(tick, 13000);

    return () => {
      clearInterval(interval);
      // darkenNavBar();
      lightenNavBar();
    };
  }, []);

  useLayoutEffect(() => {
    return () => {
      darkenNavBar();
    };
  }, []);

  return (
    <div className={s.container}>
      <motion.div
        className={s.gallery}
        onViewportLeave={debounce(lightenNavBar, 200)}
        onViewportEnter={debounce(darkenNavBar, 200)}>
        <AnimatePresence>
          <MotionParent
            key={selectedImg.img.src}
            variants={containerVariants}
            transition={transition}
            className={s.slider}>
            <motion.div className={clsx([s.img_wrapper])} variants={imageVariants}>
              <Image
                src={selectedImg.img}
                objectFit="cover"
                layout="fill"
                alt="hero slider image"
                priority
                placeholder="blur"
              />
            </motion.div>
          </MotionParent>
        </AnimatePresence>

        <div className={s.controller}>
          <IconButton
            className={s.prev}
            onClick={() => {
              touched = true;
              prev();
            }}>
            <KeyboardArrowLeftTwoTone />
          </IconButton>

          <AnimatePresence exitBeforeEnter>
            <MotionParent
              animate={
                PageAnimationEvent.get() === 'finished' ? 'animate' : PageAnimationController
              }
              className={s.text}
              key={selectedImg.img.src}
              data-idx={idx}
              variants={textContainerVariants}>
              <MotionConfig transition={textTransition}>
                <motion.p className={s.caption} variants={textItemVariants}>
                  {selectedImg.text.subtitle}
                </motion.p>
                <motion.h1
                  variants={textItemVariants}
                  dangerouslySetInnerHTML={{ __html: selectedImg.text.title }}
                />
                <motion.big variants={textItemVariants}>{selectedImg.text.desc}</motion.big>
                <motion.div variants={textItemVariants}>
                  <Link href={'/collections/all-products'}>
                    <a>
                      <Button variant="contained" size="large" data-cursor="-opaque">
                        Shop Now
                      </Button>
                    </a>
                  </Link>
                </motion.div>
              </MotionConfig>
            </MotionParent>
          </AnimatePresence>

          <IconButton
            className={s.next}
            onClick={() => {
              touched = true;
              next();
            }}>
            <KeyboardArrowRightTwoTone />
          </IconButton>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
