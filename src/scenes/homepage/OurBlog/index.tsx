import React from 'react';
import s from './ourblog.module.scss';
import { Button } from '@mui/material';

import Image from 'next/image';
import Cover from './img.png';
import Link from 'next/link';

const OurBlog = () => {
  return (
    <div className={s.container} id="blogs">
      <div className="wrapper">
        <div className="our_blogs">
          <h1>Our Blogs</h1>
          <p>
            To create this extraordinary <br /> blend, crown blender and <br />
            infused with the juicy flavor
          </p>
          <Button>Read All</Button>
        </div>

        <div className="blog_card">
          <Link href="./blog/what-s-the-best-gin-for-tom-collins">
            <a>
              <div className="cover">
                <Image src={Cover} alt="cover image" />
              </div>
              <h4> What’s The Best Gin For Tom Collins? </h4>
              <p className="date">Posted by The Bottle Haus • Tue, Sep 21, 22</p>
            </a>
          </Link>
        </div>

        <div className="blog_card">
          <Link href="./blog/best-tequila-under-100">
            <a>
              <div className="cover">
                <Image src={Cover} alt="cover-image" />
              </div>
              <h4> Best Tequila Under $100</h4>
              <p className="date">Posted by The Bottle Haus • Fri, Jun 11, 19</p>
            </a>
          </Link>
        </div>

        <div className="blog_card">
          <Link href="./blog/what-is-the-best-gin-for-a-french-75">
            <a>
              <div className="cover">
                <Image src={Cover} alt="cover-image" />
              </div>
              <h4> What is the best gin for a French 75? </h4>
              <p className="date">Posted by The Bottle Haus • Mon, Mar 01, 21</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurBlog;
