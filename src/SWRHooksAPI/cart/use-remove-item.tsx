import { useCallback } from 'react';

import useCart from './use-cart';
import * as mutation from '@/util/mutations';
import { checkoutToCart, getCheckoutId } from '@/util';
import { RemoveItemHook } from '@/types/cart';
import { HookFetcherFn, MutationHook } from '@/types/SWRHooks';
import { mutationFetcher } from '@/util/default-fetcher';
import { Provider } from '@/context/SWRHookContext';
import { useHandlerObject, useMutationHook } from '@/util/use-handler-object';

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: { query: mutation.CheckoutLineDelete },

  async fetcher({ input: { itemId }, options, fetch }) {
    // <Mutation, MutationCheckoutLineDeleteArgs>
    const data = await fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId().checkoutId,
        lineId: itemId,
      },
    });
    return checkoutToCart(data.checkoutLineDelete);
  },
  useHook:
    ({ fetcherWrapper }) =>
    () => {
      const { mutate } = useCart();

      return useCallback(
        async function removeItem(input) {
          const data = await fetcherWrapper({ input: { itemId: input.id } });
          await mutate(data, false);

          return data;
        },
        [mutate],
      );
    },
};

export type UseRemoveItem<
  H extends MutationHook<RemoveItemHook<any>> = MutationHook<RemoveItemHook>,
> = ReturnType<H['useHook']>;

export const fetcher: HookFetcherFn<RemoveItemHook> = mutationFetcher;

const fn = (provider: Provider) => provider.cart?.useRemoveItem!;

const useRemoveItem: UseRemoveItem = () => {
  const handler = useHandlerObject(fn);

  return useMutationHook({ fetcher: handler.fetcher!, ...handler })();
};

export default useRemoveItem as UseRemoveItem<typeof handler>;
