import React from 'react';
import s from './cartpage.module.scss';
import Button from '@/components/Button';
import useCart from '@/SWRHooksAPI/cart/use-cart';
import Image from 'next/image';
import Quantity from '@/scenes/CartPage/Quantity';

const CartPage = () => {
  const { data: cart } = useCart();

  return (
    <div className={s.container}>
      <div className="wrapper">
        <header>
          <h1>
            {' '}
            My <span>Cart (2)</span>{' '}
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
                    <Quantity value={quantity} />
                  </td>
                  <td className="total">
                    <p>${quantity * price}</p>
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

export default CartPage;
