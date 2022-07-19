import React from 'react';
import s from './productdetailcard.module.scss';
import cs from 'clsx';
import Image from 'next/image';
import { Button } from '@mui/material';
import { Adjust } from '@mui/icons-material';
import WhiteBg from '@/public/white-bg.png';

type ProductCardProps = {
  product: any;
};

const ProductDetailCard: React.FC<ProductCardProps> = ({ product }) => {
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
          <div className="bg">
            <Image src={WhiteBg} alt="white bg" objectFit="cover" />
          </div>

          <div className="detail_wrapper">
            <span className="sub_title">Don Julio</span>
            <h1 className="title">{product?.name}</h1>

            <div className="price_detail">
              <div className="quantity_controller">
                <Button variant="outlined" className="plus">
                  +
                </Button>
                <span className="quantity">1</span>
                <Button variant="outlined" className="minus">
                  -
                </Button>
              </div>
              <h1 className="price">${product?.price.value} </h1>
            </div>

            <div className="reviews">
              <div className="rev_svg">
                {rev.map((_, idx) => (
                  <span key={idx} />
                ))}
              </div>
              <p>19 reviews</p>
            </div>

            <div className="desc_wrapper">
              <div className="desc">
                <p className="text">{product?.description}</p>
              </div>
              <div className="bottom_gradient" />
            </div>

            <div className="cart_controllers">
              <Button variant="contained" size="large">
                Add to cart
              </Button>
              <Button variant="outlined" size="large" startIcon={<Adjust />}>
                Add personalized Gift Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
