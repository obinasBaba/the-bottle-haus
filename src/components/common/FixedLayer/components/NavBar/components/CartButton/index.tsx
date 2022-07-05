import React, { useEffect, useRef, useState } from 'react';
import s from './cartbutton.module.scss';
import Image from 'next/image';
import CartImg from '@/public/cart.png';
import { useCart } from '@/SWRHooksAPI';
import { AnimatePresence, Variants } from 'framer-motion';
import MotionWrapper from '@/components/common/MotionWrapper';
import Button from '@/components/Button';

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
    // console.log('cart-changed ---> : ', cart);
  }, [cart]);

  useEffect(() => {
    containerRef.current?.focus({ preventScroll: true });
  }, [show]);

  return (
    <div className={s.container}>
      <button className="cart" onClick={() => setShow(!show)}>
        <div className="cart-icon">
          <Image
            src={CartImg}
            alt="cart-icon"
            layout="fixed"
            width="15px"
            height="15px"
            objectFit="contain"
          />
        </div>
        <span className="cart-count">0.020$</span>
      </button>

      <AnimatePresence exitBeforeEnter custom={{ globalObj: {} }}>
        {show && (
          <MotionWrapper
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
              <p className="count_text">
                You have <span>0</span> items in your cart
              </p>
              <footer>
                <div className="hor">
                  <p>Total</p>
                  <p>$122.90</p>
                </div>
                <div className="hor">
                  <Button text="Continue Shopping" className="cart_btn" />
                  <Button text="Check Out" className="cart_btn" />
                </div>
              </footer>
            </div>
          </MotionWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;
