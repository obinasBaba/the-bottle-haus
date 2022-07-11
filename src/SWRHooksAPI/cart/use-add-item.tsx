import { useCallback } from 'react';
import useCart from './use-cart';

import { Mutation, MutationCheckoutLinesAddArgs } from '@/schema';
import { HookFetcherFn, MutationHook } from '@/types/SWRHooks';
import { CommerceError } from '@/util/errors';
import getCheckoutId from '@/util/get-checkout-id';
import checkoutToCart from '@/util/checkout-to-cart';
import { AddItemHook } from '@/types/cart';
import { mutationFetcher } from '@/util/default-fetcher';
import { Provider } from '@/context/SWRHookContext';
import { useHandlerObject, useMutationHook } from '@/util/use-handler-object';
import { CheckoutLineAdd } from '@/util';

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: { query: CheckoutLineAdd },

  // input -> cart, item, itemBody
  async fetcher({ input: item, options, fetch }) {
    if (item.quantity && (!Number.isInteger(item.quantity) || item.quantity! < 1)) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      });
    }

    const { checkoutLinesAdd } = await fetch<Mutation, MutationCheckoutLinesAddArgs>({
      ...options,
      variables: {
        checkoutId: getCheckoutId().checkoutId,
        lineItems: [
          {
            variantId: item.variantId,
            quantity: item.quantity ?? 1,
          },
        ],
      },
    });

    return checkoutToCart(checkoutLinesAdd);
  },
  useHook:
    ({ fetcherWrapper }) =>
    () => {
      const { mutate } = useCart();
      return useCallback(
        async function addItem(input) {
          const data = await fetcherWrapper({ input });
          await mutate(data, false);
          return data;
        },
        [mutate],
      );
    },
};

export type UseAddItem<H extends MutationHook<AddItemHook> = MutationHook<AddItemHook>> =
  ReturnType<H['useHook']>;

export const fetcher: HookFetcherFn<AddItemHook> = mutationFetcher;

const fn = (provider: Provider) => provider.cart?.useAddItem!;

const useAddItem: UseAddItem = () => {
  const handler = useHandlerObject(fn);
  return useMutationHook<AddItemHook>({ fetcher: handler.fetcher!, ...handler })();
};

export default useAddItem as UseAddItem<typeof handler>;
