import React, { useState } from 'react';
import s from './cartproductlist.module.scss';
import useCart from '@/SWRHooksAPI/cart/use-cart';
import Image from 'next/image';
import Quantity from '@/scenes/CartPage/CartProductList/Quantity';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Button } from '@mui/material';
import clsx from 'clsx';

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

const CartProductList = () => {
  const { data: cart } = useCart();
  const [loading, setLoading] = useState<string | undefined>();

  return (
    <div className={s.container}>
      <div className="wrapper">
        <header>
          <h1>
            My <span>Cart ({cart?.lineItems.length || 0})</span>
          </h1>
          <Button size="large" variant="outlined">
            Back
          </Button>
        </header>

        <table className="cart_product_list">
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
            <AnimatePresence exitBeforeEnter>
              {cart?.lineItems.map(
                (
                  {
                    id,
                    name,
                    quantity,
                    variant: {
                      id: variantId,
                      price,
                      product: { media },
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
                          src={(media && media[0]?.url) || ''}
                          alt="cart-icon"
                          // layout="fixed"
                          width="70"
                          height="70"
                          objectFit="cover"
                        />
                      </div>
                    </td>
                    <td className="name">
                      <p>{name}</p>
                    </td>

                    <td className="price">
                      <h3>${price}</h3>
                    </td>
                    <td className="quantity">
                      <Quantity
                        value={quantity}
                        item={{ id, variant: { id: variantId } }}
                        setLoading={setLoading}
                      />
                    </td>

                    <td className="total">
                      <p >
                        <span className={clsx([loading == id && s.hidden, 'value'])}>${Number(quantity * price).toFixed(1)}</span>
                        {loading == id && <span className="loader" />}
                      </p>
                    </td>
                  </motion.tr>
                ),
              )}
            </AnimatePresence>
          </tbody>
        </table>

        {cart?.lineItems.length == 0 && (
          <h1 className="cart_empty"> Your cart is Empty, add something to display it here.</h1>
        )}
      </div>
    </div>
  );
};

export default CartProductList;
