import React, { useEffect, useState } from 'react';
import s from './productcard.module.scss';
import { ProductTypes } from '@/types/product';
import Image from 'next/image';
import cs from 'clsx';
import Link from 'next/link';
import useAddItem from '@/SWRHooksAPI/cart/use-add-item';
import { Button } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

type ProductCardProps = {
  product?: ProductTypes['product'];
  loading: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, loading = true }) => {
  const [ready, setReady] = useState(false);
  const addItem = useAddItem();

  useEffect(() => {
    if (!loading && product) setReady(true);
  }, [loading, product]);

  return (
    <div className={cs(s.container, { [s.loading]: loading, [s.loaded]: !loading || product })}>
      {ready && !product?.isAvailable && (
        <Button
          disableRipple
          unselectable={'on'}
          variant="outlined"
          size="small"
          className={s.sold_out}>
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
            addItem({
              productId: product?.id,
              // quantity: 1,
              variantId: product!.variants[0].id.toString(),
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
                width={'240px'}
                height={'340px'}
                objectFit={'contain'}
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
