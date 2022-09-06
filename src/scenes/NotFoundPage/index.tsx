import React from 'react';
import s from './notfound.module.scss';
import NoteFoundImg from '@/public/not-found.png';
import Image from 'next/image';
import { Button } from '@mui/material';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <div className="img">
          <Image src={NoteFoundImg} objectFit="cover" alt="not found bottle image" />
        </div>

        <div className="text">
          <h1>Oh no! Error 404</h1>
          <big>
            <p>
              we can&apos;t seem to find <br /> the page you are looking for
            </p>{' '}
          </big>
          <Link href="/">
            <a>
              <Button size="large" variant="outlined">
                Back To Main Page
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
