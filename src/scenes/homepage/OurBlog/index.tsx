import React from 'react';
import s from './ourblog.module.scss';
import { Button } from '@mui/material';

import Image from 'next/image';
import Cover from './img.png';

const OurBlog = () => {
  return (
    <div className={s.container}>
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
          <div className="cover">
            <Image src={Cover} alt="cover image" />
          </div>
          <h4> What’s The Best Gin For Tom Collins? </h4>
          <p className="date">Posted by The Bottle Haus •March 1, 2022</p>
        </div>

        <div className="blog_card">
          <div className="cover">
            <Image src={Cover} alt="cover-image" />
          </div>
          <h4> What’s The Best Gin For Tom Collins? </h4>
          <p className="date">Posted by The Bottle Haus •March 1, 2022</p>
        </div>

        <div className="blog_card">
          <div className="cover">
            <Image src={Cover} alt="cover-image" />
          </div>
          <h4> What’s The Best Gin For Tom Collins? </h4>
          <p className="date">Posted by The Bottle Haus •March 1, 2022</p>
        </div>
      </div>
    </div>
  );
};

export default OurBlog;
