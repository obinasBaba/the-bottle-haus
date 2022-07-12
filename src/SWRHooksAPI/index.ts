import { CHECKOUT_ID_COOKIE } from '@/const';

/*import { handler as useCustomer } from './customer/use-customer'
import { handler as useLogin } from './auth/use-login'
import { handler as useLogout } from './auth/use-logout'
import { handler as useSignup } from './auth/use-signup'
*/
import { default as useUpdateItem, handler as updateItemHandler } from './cart/use-update-item';
import { default as useRemoveItem, handler as removeItemHandler } from './cart/use-remove-item';
import { default as useCart, handler as useCartHandler } from './cart/use-cart';
import { default as useSearch, handler as useSearchHandler } from './product/use-search';
import { default as useAddToCart, handler as addToCartHandler } from './cart/use-add-item';

import fetcher from '@/util/fetcher';

export const saleorProvider = {
  locale: 'en-us',
  cartCookieKey: CHECKOUT_ID_COOKIE,
  fetcher,
  cart: {
    useCart: useCartHandler,
    useAddItem: addToCartHandler,
    useUpdateItem: updateItemHandler,
    useRemoveItem: removeItemHandler,
  },
  // customer: { useCustomer },
  products: { useSearch: useSearchHandler },
  // auth: { useLogin, useLogout, useSignup },
};

export type SaleorProvider = typeof saleorProvider;

export { useSearch, useCart, useAddToCart, useUpdateItem, useRemoveItem };
