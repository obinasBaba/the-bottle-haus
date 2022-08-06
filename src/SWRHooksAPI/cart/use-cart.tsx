import { GetCartHook } from '@/types/cart';
import { SWRHook } from '@/types/SWRHooks';
import * as query from '@/util/queries';
import getCheckoutId from '@/util/get-checkout-id';
import checkoutCreate from '@/util/checkout-create';
import checkoutToCart from '@/util/checkout-to-cart';
import { useMemo } from 'react';
import { useHandlerObject, useSWRHook } from '@/util/use-handler-object';
import { Provider, useCommerce } from '@/context/SWRHookContext';
import Cookies from 'js-cookie';

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: query.CheckoutOne,
  },
  async fetcher({ input: { cartId: checkoutId }, options, fetch }) {
    let checkout;

    if (checkoutId) {
      const checkoutId = getCheckoutId().checkoutToken;

      console.log('checkoutId: ', checkoutId);

      checkout = await fetch({
        ...options,
        variables: { checkoutId },
      });
    }

    if (checkout?.completedAt || !checkoutId) {
      checkout = await checkoutCreate(fetch);
    }

    return checkoutToCart(checkout);
  },

  useHook:
    ({ fetcherWrapper }) =>
    (input) => {
      const response = fetcherWrapper({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      });
      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.lineItems.length ?? 0) <= 0;
              },
              enumerable: true,
            },
          }),
        [response],
      );
    },
};

export type UseCart<H extends SWRHook<GetCartHook<any>> = SWRHook<GetCartHook>> = ReturnType<
  H['useHook']
>;

const fn = (provider: Provider) => provider.cart?.useCart!;

const useCart: UseCart = (input) => {
  const handler = useHandlerObject(fn);
  const { cartCookieKey } = useCommerce().providerRef.current;
  const fetcherFn = handler.fetcher!;

  const wrapperWithDefaultCartId: typeof fetcherFn = (context) => {
    context.input.cartId = Cookies.get(cartCookieKey);
    return fetcherFn(context);
  };
  return useSWRHook<GetCartHook>({ ...handler, fetcher: wrapperWithDefaultCartId })(input);
};

export default useCart as UseCart<typeof handler>;
