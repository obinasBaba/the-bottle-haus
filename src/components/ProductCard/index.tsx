import React, { useEffect, useState } from 'react';
import s from './productcard.module.scss';
import { ProductTypes } from '@/types/product';
import Image from 'next/image';
import cs from 'clsx';

type ProductCardProps = {
  product?: ProductTypes['product'];
  loading: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, loading = true }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading && product && Array.isArray(product)) setReady(true);
  }, [loading, product]);

  return (
    <div className={cs(s.container, { [s.loading]: loading, [s.loaded]: !loading || product })}>
      {ready && product?.variants[0]?.availableForSale && (
        <div className={s.sold_out}>SOLD OUT</div>
      )}

      <div className="loading_bg" />

      {ready && <button className={s.add_to_cart} />}

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
      <p className={'title'}>{product?.name || 'Loading'}</p>
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
