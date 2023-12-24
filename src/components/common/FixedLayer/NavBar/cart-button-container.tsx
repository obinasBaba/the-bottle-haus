import CartButton from '@fixedLayer/NavBar/components/CartButton';
import { cookies } from 'next/headers';
import { getCart } from '@lib/saleor';
import { Cart } from '@lib/types';

const CartButtonContainer = async () => {
  const cartId = cookies().get('cartId')?.value;
  let cart: Cart | undefined;

  if (cartId) {
    cart = (await getCart(cartId)) ?? undefined;
  } else {
    cart = undefined;
  }

  return <CartButton cart={cart} />;
};

export default CartButtonContainer;
