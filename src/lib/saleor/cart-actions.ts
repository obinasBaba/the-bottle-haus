'use server';

import { addToCart, createCart, getCart, removeFromCart, updateCart } from '@/lib/saleor';
import { cookies } from 'next/headers';

export const addItem = async (variantId: string | undefined): Promise<string | undefined> => {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id as string;
    cookies().set('cartId', cartId);
  }

  if (!variantId) {
    return 'Missing product variant ID';
  }

  try {
    const response = await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);

    // console.log('addItem response : ', response);

  } catch (e) {
    return 'Error adding item to cart';
  }
};

export const removeItem = async (lineId: string): Promise<string | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await removeFromCart(cartId, [lineId]);
  } catch (e) {
    return 'Error removing item from cart';
  }
};

export const updateItemQuantity = async ({
  lineId,
  variantId,
  quantity,
}: {
  lineId: string;
  variantId: string;
  quantity: number;
}): Promise<string | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ]);
  } catch (e) {
    return 'Error updating item quantity';
  }
};
