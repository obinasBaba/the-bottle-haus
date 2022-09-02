import React from 'react';
import s from './ourblog.module.scss';
import { Button } from '@mui/material';

import Image from 'next/image';
import Cover from './blog-images/img.png';
import Cover1 from './blog-images/img_1.png';
import Cover2 from './blog-images/img_2.png';
import Link from 'next/link';
import { motion } from 'framer-motion';

const transition = {
  duration: 1.5,
  ease: [0.6, 0.01, 0, 0.9],
  // delay: 0.2,
};

const blogVariants = {
  initial: {},
  inView: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const blogItemVariants = {
  initial: {
    opacity: 0,
    y: '70%',
  },
  inView: {
    opacity: 1,
    y: 0,
  },
};

const OurBlog = () => {
  return (
    <motion.div
      className={s.container}
      id="blogs"
      variants={{}}
      initial="initial"
      animate="animate"
      exit="exit"
      whileInView="inView"
      viewport={{
        amount: 'some',
        once: true,
      }}>
      <motion.div className="wrapper" variants={blogVariants}>
        <motion.div className="our_blogs">
          <motion.h1
          /*   variants={blogItemVariants}
            transition={transition}*/
          >
            Our Blogs
          </motion.h1>
          <p>
            To create this extraordinary <br /> blend, crown blender and <br />
            infused with the juicy flavor
          </p>
          <Link href="../../blog/best-tequila-under-100">
            <a>
              <Button variant="outlined">Read All</Button>
            </a>
          </Link>
        </motion.div>

        <motion.div className="blog_card" variants={blogItemVariants} transition={transition}>
          <Link href="../../blog/what-s-the-best-gin-for-tom-collins">
            <a>
              <div className="cover">
                <Image src={Cover} alt="cover image" />
              </div>
              <h4> What’s The Best Gin For Tom Collins? </h4>
              <p className="date">
                Posted by The Bottle Haus <br /> • Tue, Sep 21, 22
              </p>
            </a>
          </Link>
        </motion.div>

        <motion.div className="blog_card" variants={blogItemVariants} transition={transition}>
          <Link href="../../blog/best-tequila-under-100">
            <a>
              <div className="cover">
                <Image src={Cover1} alt="cover-image" />
              </div>
              <h4> Best Tequila Under $100</h4>
              <p className="date">
                Posted by The Bottle Haus <br /> • Fri, Jun 11, 19
              </p>
            </a>
          </Link>
        </motion.div>

        <motion.div className="blog_card" variants={blogItemVariants} transition={transition}>
          <Link href="../../blog/what-is-the-best-gin-for-a-french-75">
            <a>
              <div className="cover">
                <Image src={Cover2} alt="cover-image" />
              </div>
              <h4> What is the best gin for a French 75? </h4>
              <p className="date">
                Posted by The Bottle Haus <br /> • Mon, Mar 01, 21
              </p>
            </a>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OurBlog;
