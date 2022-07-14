import React from 'react';
import s from './productcardbig.module.scss';
import cs from 'clsx';
import Image from 'next/image';
import { Button } from '@mui/material';

type ProductCardProps = {
  product: any;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const rev = Array.from(new Array(5));

  return (
    <div className={cs(s.container)}>
      <div className="wrapper">
        <div className="product_img">
          <div className="img_wrapper">
            <Image
              src={product?.images[0]?.url}
              alt="gin img"
              width={400}
              height={600}
              objectFit="cover"
            />
          </div>
        </div>

        <div className="detail">
          <div className="detail_wrapper">
            <span className="sub_title"> subtitle here </span>
            <h1 className="title">{product?.name}</h1>

            <div className="price_detail">
              <div className="quantity_controller">
                <button className="plus">+</button>
                <span className="quantity">1</span>
                <button className="minus">-</button>
              </div>
              <div className="price">${product?.price.value} </div>
            </div>

            <div className="reviews">
              <div className="rev_svg">
                {rev.map((_, idx) => (
                  <span key={idx} />
                ))}
              </div>
              <p>191 reviews</p>
            </div>

            <p className="desc">{product?.description}</p>

            <div className="cart_controllers">
              <Button>Add to cart</Button>
              <Button>Add personalized Gift Note</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
