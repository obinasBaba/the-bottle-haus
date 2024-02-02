'use client';

import React, { useEffect, useState } from 'react';
import s from './cartproductlist.module.scss';
import Image from 'next/image';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Button } from '@mui/material';
import clsx from 'clsx';
import { useLocomotiveScroll } from '@/context/LocoMotive';
import { Cart } from '@lib/types';
import Quantity from './Quantity';

export const basicVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

const transition = {
  duration: 1,
  ease: [0.6, 0.01, 0, 0.9],
};

type Props = {
  cart?: Cart;
};

const CartProductList = ({ cart }: Props) => {
  const [loading, setLoading] = useState<string | undefined>();
  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    scroll?.update();
  }, [cart, scroll]);

  return (
    <div className={s.container} data-scroll={true}>
      <div className="wrapper" id="cart-product-wrapperz" data-scroll={true}>
        <header>
          <h1>
            My <span>Cart ({cart?.lines?.length || 0})</span>
          </h1>
        </header>

        <table className="cart_product_list" data-scroll={true}>
          <thead>
            <tr>
              <th scope="col" colSpan={2}>
                Product
              </th>
              <th scope="col" colSpan={1}>
                Price
              </th>
              <th scope="col" colSpan={1}>
                Quantity
              </th>
              <th scope="col" colSpan={1}>
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence mode="wait">
              {cart?.lines?.map(
                (
                  {
                    id,
                    quantity,
                    merchandise: {
                      product: { images, title, price, variants },
                    },
                  },
                  idx,
                ) => (
                  <motion.tr
                    className="table_row"
                    key={id}
                    variants={basicVariants}
                    transition={transition}>
                    <td className="image">
                      <div className="p_image">
                        <Image
                          src={(images && images[0]?.url) || ''}
                          alt="cart-icon"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </td>
                    <td className="name">
                      <p>{title}</p>
                    </td>

                    <td className="price">
                      <h3>${price.value}</h3>
                    </td>
                    <td className="quantity">
                      <Quantity
                        quantity={quantity}
                        item={{ variant: { id: variants[0] }, lineId: id }}
                        setLoading={setLoading}
                      />
                    </td>

                    <td className="total">
                      <p>
                        <span className={clsx([loading == id && s.hidden, 'value'])}>
                          ${Number(quantity * price.value).toFixed(1)}
                        </span>
                        {loading == id && <span className="loader" />}
                      </p>
                    </td>
                  </motion.tr>
                ),
              )}
            </AnimatePresence>
          </tbody>
        </table>

        {cart?.lines.length == 0 && (
          <>
            <h1 className="cart_empty"> Your cart is Empty, add something to display it here.</h1>
            <Button size="large" data-cursor="-opaque">
              Return to shopping
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartProductList;
