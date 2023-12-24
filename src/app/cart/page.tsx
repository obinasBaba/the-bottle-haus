import CartPageScene from '@/scenes/CartPage';
import { cookies } from 'next/headers';
import { Cart } from '@lib/types';
import { getCart } from '@lib/saleor';

const CartPage = async () => {
  const cartId = cookies().get('cartId')?.value;
  let cart: Cart | undefined;

  if (cartId) {
    cart = (await getCart(cartId)) ?? undefined;
  } else {
    cart = undefined;
  }

  return (
    <>
      <CartPageScene cart={cart} />
    </>
  );
};

export default CartPage;
