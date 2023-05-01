import React, { useEffect, useRef, useState } from 'react';
import s from './productcard.module.scss';
import { ProductTypes } from '@/types/product';
import Image from 'next/image';
import cs from 'clsx';
import clsx from 'clsx';
import Link from 'next/link';
import useAddItem from '@/SWRHooksAPI/cart/use-add-item';
import { Button } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useAppInfo } from '@/context/MotionValuesContext';
import { useAppContext } from '@/context/app';
import gsap from 'gsap';
import { motion, useAnimation } from 'framer-motion';
import { pageTransition } from '@/scenes/Homepage';

type ProductCardProps = {
  product?: ProductTypes['product'];
  loading: boolean;
};

const pImgVariant = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
};

const ProductCard: React.FC<ProductCardProps> = ({ product, loading = true }) => {
  const [ready, setReady] = useState(false);
  const control = useAnimation();
  const ghostImgRef = useRef<HTMLDivElement | null>(null);
  const addItem = useAddItem();

  const { toolTipsData } = useAppInfo();
  const { showNavBar } = useAppContext();

  useEffect(() => {
    if (!loading && product) setReady(true);
  }, [loading, product]);

  const onAddToCart = () => {
    showNavBar();
    toolTipsData.set({ show: true, text: 'Adding to Cart', loading: true });

    addItem({
      productId: product?.id, // quantity: 1,
      variantId: product!.variants[0].id.toString(),
    })
      .then((r) => {
        const cartRect = document.querySelector('.navbar_cart')?.getBoundingClientRect()!;
        const targetRect = ghostImgRef.current?.getBoundingClientRect()!;

        gsap.to(ghostImgRef.current, {
          y: cartRect.top + cartRect.height / 2 - (targetRect.top + targetRect.height / 2),
          x: cartRect.left + cartRect.width / 2 - (targetRect.left + targetRect.width / 2),
          scale: 0.05,
          opacity: 0,
          duration: 2,
          ease: 'expo.out',
          onComplete() {
            gsap.to(ghostImgRef.current, {
              y: 0,
              x: 0,
              scale: 1,
              opacity: 1,
              duration: 0,
              onComplete() {
                control.start('initial');
              },
            });
          },
        });

        control.start('animate');

        toolTipsData.set({ show: false });
      })
      .catch((e) => {
        console.error('error: ', JSON.stringify(e, null, 2));

        toolTipsData.set({
          id: 'error',
          show: true,
          text: 'something is wrong! check your network',
          loading: true,
        });
      });
  };

  return (
    <div className={cs(s.container, { [s.loading]: loading, [s.loaded]: !loading || product })}>
      {ready && !product?.isAvailable && (
        <Button disabled unselectable="on" variant="outlined" size="small" className={s.sold_out}>
          SOLD OUT
        </Button>
      )}

      <div className="loading_bg" />

      {ready && product?.isAvailable && (
        <Button
          variant="outlined"
          // size='small'
          color="primary"
          className={s.add_to_cart}
          onClick={onAddToCart}>
          <AddRounded />
        </Button>
      )}

      <Link href={`/product/${product?.slug}`}>
        <a className={s.img_link}>
          <motion.div
            className={s.product_img}
            variants={pImgVariant}
            initial="initial"
            animate={control}
            transition={{ ...pageTransition, duration: 1 }}>
            {product && (
              <Image
                src={product?.images[0].url!}
                alt={product?.images[0].alt}
                width="240px"
                height="340px"
                objectFit="contain"
                className="p_img"
              />
            )}
          </motion.div>

          <div className={clsx([s.product_img, s.ghost_img])} ref={ghostImgRef}>
            <Image
              src={product?.images[0].url!}
              alt={product?.images[0].alt}
              width="240px"
              height="340px"
              objectFit="contain"
              className="p_img"
            />
          </div>
        </a>
      </Link>

      <Link href={`/product/${product?.slug}`}>
        <a>
          <p className={'title'}>{product?.name || 'Loading'}</p>
        </a>
      </Link>

      <div className="price">
        <p className="value">
          {(product && `$${Number(product.price.value - product.price.discount).toFixed(2)}`) ||
            'Loading'}{' '}
        </p>
        {product && product!.price.discount > 0 && (
          <p className="discount">${product!.price.value}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
