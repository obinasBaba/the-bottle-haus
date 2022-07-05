import { useCallback } from 'react';
import { Provider, useCommerce } from '@/context/SWRHookContext';
import type { MutationHook, PickRequired, SWRHook } from '@/types/SWRHooks';
import { SWRHookSchemaBase } from '@/types/SWRHooks';
import useSwrCaller from './use-swr';

export function useFetcher() {
  const { providerRef, fetcherRef } = useCommerce();
  return providerRef.current.fetcher ?? fetcherRef.current;
}

export function useHandlerObject<P extends Provider, H extends MutationHook<any> | SWRHook<any>>(
  fn: (provider: P) => H,
) {
  const { providerRef } = useCommerce<P>();
  const provider = providerRef.current;
  return fn(provider);
}

export function useSWRHook<B extends SWRHookSchemaBase, H extends SWRHook<B>>(
  options: PickRequired<H, 'fetcher'>,
) {
  const globalFetcher = useFetcher(); // global common fetcher

  return options.useHook({
    fetcherWrapper: function (ctx) {
      return useSwrCaller<B>(options, ctx?.input ?? [], globalFetcher, ctx?.swrOptions);
    },
  });
}

export function useMutationHook<H extends MutationHook<any>>(hook: PickRequired<H, 'fetcher'>) {
  const fetcher = useFetcher();

  return hook.useHook({
    fetch: useCallback(
      ({ input } = {}) => {
        return hook.fetcher({
          input,
          options: hook.fetchOptions,
          fetch: fetcher,
        });
      },
      [fetcher, hook],
    ),
  });
}
