import React, { useEffect, useRef, useState } from 'react';
import s from './cartbutton.module.scss';
import Image from 'next/image';
import { useCart } from '@/SWRHooksAPI';
import { AnimatePresence, Variants } from 'framer-motion';
import MotionParent from '@/components/common/MotionItems';
import Link from 'next/link';
import { Button } from '@mui/material';
import { ShoppingCartTwoTone } from '@mui/icons-material';

const popupVariants: Variants = {
  initial: {
    scale: 0.8,
    x: 20,
    y: -20,
    opacity: 0,
  },
  animate: {
    scale: 1,
    x: 0,
    y: 0,
    opacity: 1,
  },

  exit: {
    opacity: 0,
    scale: 0.7,
    x: 50,
    y: -50,
    transition: {
      opacity: {
        duration: 0.2,
      },
      default: {
        type: 'spring',
      },
    },
  },
};

const CartButton = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const cart = useCart();

  useEffect(() => {
    console.log('cart-changed ---> : ', cart);
  }, [cart]);

  useEffect(() => {
    containerRef.current?.focus({ preventScroll: true });
  }, [show]);

  return (
    <div className={s.container}>
      <Button variant="outlined" onClick={() => setShow(!show)} startIcon={<ShoppingCartTwoTone />}>
        {/*<div className="cart-icon">
          <Image
            src={CartImg}
            alt="cart-icon"
            layout="fixed"
            width="15px"
            height="15px"
            objectFit="contain"
          />
        </div>
        <span className="cart-count"> {cart?.data?.totalPrice || 0} $ </span>*/}
        {cart?.data?.totalPrice || 0} $
      </Button>

      <AnimatePresence exitBeforeEnter custom={{ globalObj: {} }}>
        {show && (
          <MotionParent
            className="popper"
            variants={popupVariants}
            tabIndex={0}
            ref={containerRef}
            onBlur={(e: FocusEvent) => {
              if (e.relatedTarget === null) setShow(false);
            }}>
            <div className="pop_wrapper">
              <header>
                <p>Added to Cart</p>
              </header>

              <div className="cart_list_wrapper">
                <div className="cart_list_bottom_gradient" />
                <div className="cart_list">
                  {cart.data?.lineItems.map(
                    ({
                      id,
                      name,
                      variant: {
                        price,
                        product: { media },
                      },
                    }) => (
                      <div className="cart_list_item" key={id}>
                        <Image
                          src={(media && media[0]?.url) || ''}
                          alt="cart-icon"
                          layout="fixed"
                          width="55px"
                          height="55px"
                          objectFit="contain"
                        />
                        <div className="ver">
                          <h3 className="price">${price}</h3>
                          <p className="name">{name}</p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <p className="count_text">
                You have <span>{cart.data?.lineItems.length || 0}</span> items in your cart
              </p>
              <footer>
                <div className="hor">
                  <p>Total</p>
                  <p>$122.90</p>
                </div>
                <div className="hor">
                  <Button
                    text="Continue Shopping"
                    className="cart_btn"
                    onClick={() => setShow(false)}
                  />
                  <Link href={'/cart'} onClick={() => setShow(false)}>
                    <a>
                      <Button text="Check Out" className="cart_btn" />
                    </a>
                  </Link>
                </div>
              </footer>
            </div>
          </MotionParent>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;
