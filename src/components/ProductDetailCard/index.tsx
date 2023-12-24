import React, { useState } from 'react';
import s from './productdetailcard.module.scss';
import cs from 'clsx';
import clsx from 'clsx';
import Image from 'next/image';
import { Button } from '@mui/material';
import { AddShoppingCart, Adjust } from '@mui/icons-material';
import { pageTransition } from '@/scenes/Homepage';
import { motion, MotionConfig } from 'framer-motion';
import { MotionChild, MotionParent } from '@/components/common/MotionItems';
import { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useAppInfo } from '@/context/MotionValuesContext';
import Link from 'next/link';
import { useAppContext } from '@/context/app';
import {
  detailTxtBackgroundVariant,
  detailTxtWrapper,
  imgVariants,
  returnButtonVariants,
  signVariants,
  titleContainerVariants,
  titleWordVariants,
} from '@/components/ProductDetailCard/variants';

import WhiteBg from '@/public/white-bg.png';
import Sign from '@/public/sign.png';
import Storage from '@/public/storage-stack.png';
import ProductBg from './bottle-bg.png';
import { Stack } from '@mui/system';

type ProductCardProps = {
  product: Product;
  productBg?: boolean;
};

function ReturnButton() {
  const router = useRouter();

  return (
    <div className={s.return_btn} onClick={() => router.back()} data-cursor="-opaque">
      <motion.svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        initial="initial"
        whileHover="hover">
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={pageTransition}
          r="25.5"
          transform="matrix(1 0 0 -1 27 27)"
          stroke="#9D6F4D"
          strokeWidth="2"
        />
        <motion.path
          variants={returnButtonVariants as any}
          transition={returnButtonVariants.transition}
          className="path1"
          d="M34 28H22.14L25.77 32.36C25.9397 32.5642 26.0214 32.8275 25.997 33.0919C25.9726 33.3564 25.8442 33.6003 25.64 33.77C25.4358 33.9397 25.1725 34.0214 24.9081 33.997C24.6436 33.9726 24.3997 33.8442 24.23 33.64L19.23 27.64C19.1964 27.5923 19.1663 27.5421 19.14 27.49C19.14 27.44 19.14 27.41 19.07 27.36C19.0247 27.2453 19.0009 27.1233 19 27C19.0009 26.8767 19.0247 26.7547 19.07 26.64C19.07 26.59 19.07 26.56 19.14 26.51C19.1663 26.4579 19.1964 26.4077 19.23 26.36L24.23 20.36C24.324 20.2471 24.4418 20.1563 24.5748 20.0941C24.7079 20.0319 24.8531 19.9998 25 20C25.2337 19.9995 25.4601 20.0809 25.64 20.23C25.7413 20.314 25.825 20.4171 25.8863 20.5334C25.9477 20.6497 25.9855 20.7771 25.9975 20.908C26.0096 21.039 25.9957 21.1711 25.9567 21.2967C25.9176 21.4223 25.8542 21.539 25.77 21.64L22.14 26H34C34.2652 26 34.5196 26.1054 34.7071 26.2929C34.8946 26.4804 35 26.7348 35 27C35 27.2652 34.8946 27.5196 34.7071 27.7071C34.5196 27.8946 34.2652 28 34 28Z"
          fill="#9D6F4D"
        />
      </motion.svg>
    </div>
  );
}

function ProductTitle(props: { name: string }) {
  return (
    <motion.div className={s.title} variants={titleContainerVariants}>
      {props.name.split(' ').map((word, idx) => (
        <div className={s.clip_overflow} key={idx}>
          <motion.h1 variants={titleWordVariants} custom={{ idx }} className={s.word}>
            {word}
          </motion.h1>
        </div>
      ))}
    </motion.div>
  );
}

const ProductDetailCard: React.FC<ProductCardProps> = ({ product, productBg }) => {
  const rev = Array.from(new Array(5));

  // const addItem = useAddItem();
  const addItem: any = () => {};

  const { toolTipsData } = useAppInfo();
  const { showNavBar } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  // console.log('product: ', product);

  if (!product) {
    return null;
  }

  const addToCart = () => {
    if (!product.availableForSale) {
      toolTipsData.set({ show: true, text: 'product is sold-out', loading: false, timer: 3000 });
      return;
    }

    showNavBar();
    toolTipsData.set({ show: true, text: 'Adding to Cart...', loading: true });
    addItem({
      productId: product?.id, // quantity: 1,
      variantId: product?.variants[0]?.id?.toString(),
    })
      .then(() => {
        toolTipsData.set({ show: false });
      })
      .catch((e: any) => {
        console.error('error: ', JSON.stringify(e, null, 2));

        toolTipsData.set({
          id: 'error',
          show: true,
          text: 'something is wrong! check your network',
          loading: false,
          duration: 4000,
        });
      });
  };

  return (
    <div className={cs(s.container)}>
      <div className={s.wrapper}>
        <MotionConfig
          transition={{
            duration: 1.5,
            ease: [0.6, 0.01, 0, 0.9],
            delay: 0.2,
          }}>
          <div className={s.product_img}>
            {!productBg && <ReturnButton />}

            <div className={clsx([s.storage, 'storage-art'])}>
              <Image src={Storage} alt="Storage Stack" />
            </div>
            <motion.div className={s.img_wrapper} variants={!productBg ? imgVariants : {}}>
              {productBg && (
                <div className={s.product_bg}>
                  <Image src={ProductBg} alt="product bg" />
                </div>
              )}

              <Image
                src={product?.images[0]?.url}
                alt="gin img"
                width={400}
                height={600}
                objectFit="cover"
              />
            </motion.div>
          </div>
        </MotionConfig>

        <div className={s.detail}>
          <div className={s.signature}>
            <motion.div variants={signVariants}>
              <Image src={Sign} alt="juvi signature" />
            </motion.div>
          </div>

          <motion.div
            className={s.bg}
            variants={detailTxtBackgroundVariant}
            transition={detailTxtBackgroundVariant.transition}>
            <Image src={WhiteBg} alt="white bg" objectFit="cover" />
          </motion.div>

          <MotionParent className={s.detail_wrapper} variants={detailTxtWrapper}>
            <div className={s.clip_overflow}>
              <MotionChild className={s.sub_title}>{product.title?.slice(0, 10)}</MotionChild>

              <ProductTitle name={product?.title || 'No Name'} />
            </div>

            <MotionChild className={s.price_detail}>
              <div className={s.quantity_controller}>
                <Button
                  variant="outlined"
                  className={s.plus}
                  onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
                <span className={s.quantity}>{quantity}</span>
                <Button
                  variant="outlined"
                  className={s.minus}
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                  -
                </Button>
              </div>
              <Stack direction="row" alignItems="center" gap=".5rem">
                <h1 className={s.price}>${product?.priceRange.maxVariantPrice?.amount} </h1>

                {!product?.availableForSale && (
                  <Button
                    // disabled
                    unselectable="on"
                    variant="contained"
                    size="small"
                    className={s.sold_out}>
                    SOLD OUT
                  </Button>
                )}
              </Stack>
            </MotionChild>

            <MotionChild className={s.reviews}>
              <div className={s.rev_svg}>
                {rev.map((_, idx) => (
                  <span key={idx} />
                ))}
              </div>
              <p>19 reviews</p>
            </MotionChild>

            <MotionChild className={s.desc_wrapper}>
              <div className={s.desc}>
                <div dangerouslySetInnerHTML={{ __html: product?.descriptionHtml }} />
              </div>
              <div className={s.bottom_gradient} />
            </MotionChild>

            <MotionChild className={s.cart_controllers}>
              <Button
                variant="contained"
                size="large"
                onClick={addToCart}
                data-cursor="-opaque"
                startIcon={<AddShoppingCart />}
                disabled={!product?.availableForSale}>
                {product?.availableForSale ? 'Add to Cart' : 'Sold-Out'}
              </Button>
              <Link href={'/checkout'}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Adjust />}
                  data-cursor="-opaque">
                  To Checkout
                </Button>
              </Link>
            </MotionChild>
          </MotionParent>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
