import { useCallback } from 'react';
import useCart from './use-cart';
import { handler as removeItemHandler } from './use-remove-item';
import { checkoutToCart, getCheckoutId } from '@/util';
import { Mutation, MutationCheckoutLinesUpdateArgs } from '@/schema';

import * as mutation from '@/util/mutations';

import { useHandlerObject, useMutationHook } from '@/util/use-handler-object';
import { Provider } from '@/context/SWRHookContext';
import { MutationHook } from '@/types/SWRHooks';
import { UpdateItemHook } from '@/types/cart';
import { ValidationError } from '@/util/errors';

export const handler: MutationHook<UpdateItemHook> = {
  fetchOptions: { query: mutation.CheckoutLineUpdate },
  async fetcher({ input: { itemId, item }, options, fetch }) {
    if (Number.isInteger(item.quantity)) {
      // Also allow the update hook to remove an item if the quantity is lower than 1
      if (item.quantity! < 1) {
        return removeItemHandler.fetcher!({
          options: removeItemHandler.fetchOptions,
          input: { itemId },
          fetch,
        });
      }
    } else if (item.quantity) {
      throw new ValidationError({
        message: 'The item quantity has to be a valid integer',
      });
    }

    const checkoutId = getCheckoutId().checkoutId;
    const { checkoutLinesUpdate } = await fetch<Mutation, MutationCheckoutLinesUpdateArgs>({
      ...options,
      variables: {
        checkoutId,
        lineItems: [
          {
            variantId: item.variantId,
            quantity: item.quantity,
          },
        ],
      },
    });

    return checkoutToCart(checkoutLinesUpdate);
  },
  useHook:
    ({ fetcherWrapper }) =>
    () => {
      const { mutate } = useCart();

      return useCallback(
        async (input) => {
          const data = await fetcherWrapper({
            input: {
              itemId: input.id,
              item: {
                variantId: input.variantId,
                quantity: input.quantity,
              },
            },
          });
          await mutate(data, false);

          return data;
        },
        [mutate],
      );
    },
};

export type UseUpdateItem<
  H extends MutationHook<UpdateItemHook<any>> = MutationHook<UpdateItemHook>,
> = ReturnType<H['useHook']>;

const fn = (provider: Provider) => provider.cart?.useUpdateItem!;

const useUpdateItem: UseUpdateItem = () => {
  const handler = useHandlerObject(fn);

  return useMutationHook({ fetcher: handler.fetcher!, ...handler })();
};

export default useUpdateItem as UseUpdateItem<typeof handler>;
