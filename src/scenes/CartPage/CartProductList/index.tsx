import React, { useState } from 'react';
import s from './cartproductlist.module.scss';
import Button from '@/components/Button';
import useCart from '@/SWRHooksAPI/cart/use-cart';
import Image from 'next/image';
import Quantity from '@/scenes/CartPage/CartProductList/Quantity';
import { motion } from 'framer-motion';

const CartProductList = () => {
  const { data: cart } = useCart();
  const [loading, setLoading] = useState(false);

  return (
    <div className={s.container}>
      <div className="wrapper">
        <header>
          <h1>
            My <span>Cart ({cart?.lineItems.length || 0})</span>
          </h1>
          <Button text="Back" />
        </header>

        <table className="cart_product_list">
          <thead className="product_list_item">
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
            {cart?.lineItems.map(
              ({
                id,
                name,
                quantity,
                variant: {
                  id: variantId,
                  price,
                  product: { media },
                },
              }) => (
                <tr className="table_row" key={id}>
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
                  <td>
                    <h3 className="price">${price}</h3>
                  </td>
                  <td className="quantity">
                    <Quantity
                      value={quantity}
                      item={{ id, variant: { id: variantId } }}
                      setLoading={setLoading}
                    />
                  </td>
                  <td className="total">
                    {loading ? (
                      <motion.div
                        className="loader"
                        transition={{ repeat: Infinity, repeatType: 'mirror' }}
                        animate={{ rotate: [0, 360, 0], origin: 0.5 }}>
                        <svg
                          height="100%"
                          width="100%"
                          role="presentation"
                          className="spinner"
                          viewBox="0 0 66 66"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle
                            className="path"
                            stroke="black"
                            fill="none"
                            strokeWidth="6"
                            cx="15"
                            cy="33"
                            r="30"></circle>
                        </svg>
                      </motion.div>
                    ) : (
                      <p>${Number(quantity * price).toFixed(1)}</p>
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartProductList;
