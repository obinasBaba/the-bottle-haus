import React, { useEffect, useState } from 'react';
import s from './productcard.module.scss';
import { ProductTypes } from '@/types/product';
import Image from 'next/image';
import cs from 'clsx';
import Link from 'next/link';
import useAddItem from '@/SWRHooksAPI/cart/use-add-item';
import { Button } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useAppInfo } from '@/context/MotionValuesContext';
import { useAppContext } from '@/context/app';

type ProductCardProps = {
  product?: ProductTypes['product'];
  loading: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, loading = true }) => {
  const [ready, setReady] = useState(false);
  const addItem = useAddItem();

  const { toolTipsData } = useAppInfo();
  const { showNavBar } = useAppContext();

  useEffect(() => {
    if (!loading && product) setReady(true);
  }, [loading, product]);

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
          onClick={() => {
            showNavBar();
            toolTipsData.set({ show: true, text: 'Adding to Cart', loading: true });
            addItem({
              productId: product?.id,
              // quantity: 1,
              variantId: product!.variants[0].id.toString(),
            })
              .then((r) => {
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
          }}>
          <AddRounded />
        </Button>
      )}

      <Link href={`/product/${product?.slug}`}>
        <a>
          <div className="product-img">
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
          {(product && `$${product.price.value - product.price.discount}`) || 'Loading'}{' '}
        </p>
        {product && product!.price.discount > 0 && (
          <p className="discount">{product!.price.discount}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
