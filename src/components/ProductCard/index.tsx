import React from 'react';
import s from './productcard.module.scss';
import { ProductTypes } from '@/types/product';
import Image from 'next/image';

type ProductCardProps = {
  products: ProductTypes['product'];
};

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  return (
    <div className={s.container}>
      {products?.variants[0]?.availableForSale && <div className="sold-out">SOLD OUT</div>}

      <button className={s.add_to_cart} />

      <div className="product-img">
        <Image
          src={products?.images[0].url}
          alt={products?.images[0].alt}
          width={'240px'}
          height={'340px'}
          objectFit={'contain'}
        />
      </div>
      <p className={'title'}>{products.name}</p>
      <div className="price">
        <p className="value">${products.price.value - products.price.discount}</p>
        {products.price.discount > 0 && <p className="discount">{products.price.discount}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
