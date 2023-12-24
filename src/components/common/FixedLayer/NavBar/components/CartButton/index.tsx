'use client';

import React, { useEffect, useRef, useState } from 'react';
import s from './cartbutton.module.scss';
import Image from 'next/image';
import { AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { Button, Chip } from '@mui/material';
import { ShoppingCartTwoTone } from '@mui/icons-material';
import { MotionParent } from '@/components/common/MotionItems';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ClickAwayListener } from '@mui/base';
import clsx from 'clsx';
import { Cart } from '@lib/types';
import { Stack } from '@mui/system';

export const popupVariants: Variants = {
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

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    // right: 3,
    top: 10,
    border: '2px solid inherit',
    padding: '0 4px',
  },
}));

type Props = {
  cart?: Cart;
};

const CartButton = ({ cart }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState<boolean>(false);
  // const cart = useCart();

  useEffect(() => {
    show && containerRef.current?.focus({ preventScroll: true });
  }, [show]);

  return (
    <div className={clsx([s.container, 'navbar_cart'])}>
      <Badge
        className={s.badge}
        badgeContent={cart?.totalQuantity}
        showZero={false}
        // color="primary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <Button
          variant="text"
          color="inherit"
          onClick={() => setShow(!show)}
          startIcon={<ShoppingCartTwoTone />}>
          {cart?.cost.totalAmount.amount || 0} $
        </Button>
      </Badge>

      <AnimatePresence mode="wait" custom={{ globalObj: {} }}>
        {show && (
          <ClickAwayListener onClickAway={() => setShow(false)}>
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
                    {cart?.lines.map(
                      ({
                        id,
                        quantity,
                        merchandise: {
                          product: { images, title, price },
                        },
                      }) => (
                        <div className="cart_list_item" key={id}>
                          <Image
                            src={(images && images[0]?.url) || ''}
                            alt="cart-icon"
                            layout="fixed"
                            width={55}
                            height={55}
                          />
                          <div className="ver">
                            <Stack direction="row" spacing={1}>
                              <h3 className="price">${price.value}</h3>
                              <Chip label={quantity} size="small" color="primary" />
                            </Stack>
                            <p className="name">{title}</p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <p className="count_text">
                  You have <span>{cart?.lines?.length || 0}</span> items in your cart
                </p>
                <footer>
                  <div className="hor">
                    <p>Total</p>
                    <p>${cart?.cost.subtotalAmount.amount || 0}</p>
                  </div>
                  <div className="hor">
                    <Button
                      className="cart_btn"
                      onClick={() => setShow(false)}
                      variant="outlined"
                      size="small">
                      Continue Shopping
                    </Button>
                    <Link href={'/cart'}>
                      <Button
                        onClick={() => setShow(false)}
                        className="cart_btn"
                        variant="outlined"
                        size="small">
                        Check Out
                      </Button>
                    </Link>
                  </div>
                </footer>
              </div>
            </MotionParent>
          </ClickAwayListener>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;
