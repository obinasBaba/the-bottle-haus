import React, { useEffect, useRef, useState, useTransition } from 'react';
import s from './productcard.module.scss';
import Image from 'next/image';
import cs from 'clsx';
import clsx from 'clsx';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useAppInfo } from '@/context/MotionValuesContext';
import { useAppContext } from '@/context/app';
import gsap from 'gsap';
import { motion, useAnimation } from 'framer-motion';
import { pageTransition } from '@/scenes/Homepage';
import { Product } from '@lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { addItem } from '@lib/saleor/cart-actions';

type ProductCardProps = {
  product?: Product;
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
  // const addItem = useAddItem();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { toolTipsData } = useAppInfo();
  const { showNavBar } = useAppContext();

  useEffect(() => {
    if (!loading && product) setReady(true);
  }, [loading, product]);

  const onAddToCart = () => {
    if (!product?.availableForSale) return;

    console.log('product: ', product);


    showNavBar();
    toolTipsData.set({ show: true, text: 'Adding to Cart', loading: true, closeable: false });

    const selectedVariantId = product.variants[0].id;

    addItem(selectedVariantId)
      .then((res) => {

        console.log('response: ', res);

        if (res){
          toolTipsData.set({
            // id: 'error',
            loading: false,
            show: true,
            text: res as string,
            duration: 3000,
          });
          return;
        }


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
                control.start('initial', {
                  duration: 0,
                });
              },
            });
          },
        });

        control.start('animate');

        toolTipsData.set({ show: false });
        router.refresh();
      })
      .catch((e) => {
        console.error('error: ', JSON.stringify(e, null, 2));

        toolTipsData.set({
          id: 'error',
          show: true,
          text: 'something is wrong! check your network',
        });
      });
  };

  return (
    <div className={cs(s.container, { [s.loading]: loading, [s.loaded]: !loading || product })}>
      {ready && !product?.availableForSale && (
        <Button disabled unselectable="on" variant="outlined" size="small" className={s.sold_out}>
          SOLD OUT
        </Button>
      )}

      <div className={s.loading_bg} />

      {ready && product?.availableForSale && (
        <Button
          variant="outlined"
          // size='small'
          color="primary"
          className={s.add_to_cart}
          onClick={() => {
            // Safeguard in case someone messes with `disabled` in devtools.
            onAddToCart();
          }}>
          <AddRounded />
        </Button>
      )}

      <Link href={`/product/${product?.handle}`}>
        <div className={s.img_link}>
          <motion.div
            className={s.product_img}
            // variants={pImgVariant}
            // initial="initial"
            // animate={control}
            transition={{ ...pageTransition, duration: 1 }}>
            {product && (
              <Image fill src={product?.images[0].url!} alt={product?.images[0].altText} />
            )}
          </motion.div>

          <div className={clsx([s.product_img, s.ghost_img])} ref={ghostImgRef}>
            <Image fill src={product?.images[0].url!} alt={product?.images[0].altText ?? 'ghost'} />
          </div>
        </div>
      </Link>

      <Link href={`/product/${product?.handle}`}>
        <p className={s.title}>{product?.title || 'Loading'}</p>
      </Link>

      <div className={s.price}>
        <Typography className={s.value}>
          {(product && `$${Number(product.price.value - product.price.discount).toFixed(2)}`) ||
            'Loading'}{' '}
        </Typography>
        {product && product!.price.discount > 0 && (
          <Typography className={s.discount}>${product!.price.value}</Typography>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
