import React from 'react';
import s from './featuredgrid.module.scss';
import Image from 'next/image';

import Featured from './imgs/featured-big.png';
import Cognac from './imgs/cognack.png';
import Rum from './imgs/rum.png';
import Whisky from './imgs/whisky.png';
import Wine from './imgs/wine.png';
import Haus from './imgs/img.png';
import Haus2 from './imgs/img_1.png';
import Vodka from './imgs/vodka.png';
import Link from 'next/link';
import { SceneTitle } from '@/scenes/Homepage/FeaturedCollection';
import clsx from 'clsx';

import CollectionArt from './imgs/collections.png';

const data = [
  { img: Featured, text: 'Featured', link: '/collection/all-products' },
  {
    img: Haus,
    text: 'More',
    link: '/collection/all-products',
  },
  { img: Wine, text: 'Wine', link: '/collection/wine' },
  {
    clr: 'lightcoral',
    text: 'Tequila',
    link: '/collection/tequila',
  },
  { clr: '#FE8029', text: 'Gin', link: '/collection/gin' },
  {
    img: Vodka,
    text: 'Vodka',
    link: '/collection/vodka',
  },
  { img: Haus2, text: 'Haus2', link: '/collection/all-products' },
  {
    img: Cognac,
    text: 'Cognac',
    link: '/collection/cognac',
  },
  { img: Rum, text: 'Rum', link: '/collections/rum' },
  {
    img: Whisky,
    text: 'Whisky',
    link: '/collection/whisky',
  },
  { clr: '#94C4C8', text: 'More', link: '/collection/all-products' }, // { clr: 'teal', text: 'More' },
];

//https://thebottlehaus.com/collections/champagne

const FeaturedGrid = () => {
  return (
    <div className={s.container}>
      <div className={s.coll_art}>
        <div data-scroll={true} data-scroll-speed={-1} data-scroll-delay={0.05}>
          <Image src={CollectionArt} alt="flower glass" />
        </div>
      </div>

      <div className="featured_grid_wrapper">
        <header>
          <SceneTitle title="Featured <span>Collections</span>" />
        </header>

        <div
          className="grid_view"
          // data-scroll={true}
          // data-scroll-delay={0.05}
          // data-scroll-speed={0.5}
        >
          {data.map(({ img, text, clr, link }, idx) => (
            <>
              <Link href={link}>
                <a
                  className={clsx([s.item, img && s.grid_img])}
                  style={{ background: clr }}
                  data-cursor-text={text}>
                  {img ? <Image src={img} alt={'grid image'} objectFit={'cover'} /> : <p>{text}</p>}
                </a>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedGrid;
