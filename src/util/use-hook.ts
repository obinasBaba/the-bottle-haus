import { useCallback } from 'react';
import { Provider, useCommerce } from '@/context/SWRHookContext';
import type { MutationHook, PickRequired, SWRHook } from '@/types/SWRHooks';
import useSwrCaller from './use-data';

export function useFetcher() {
  const { providerRef, fetcherRef } = useCommerce();
  return providerRef.current.fetcher ?? fetcherRef.current;
}

export function useHook<P extends Provider, H extends MutationHook<any> | SWRHook<any>>(
  fn: (provider: P) => H,
) {
  const { providerRef } = useCommerce<P>();
  const provider = providerRef.current;
  return fn(provider);
}

export function useSWRHook<H extends SWRHook<any>>(options: PickRequired<H, 'fetcher'>) {
  const fetcher = useFetcher();

  return options.useHook({
    fetchData: function (ctx) {
      return useSwrCaller(options, ctx?.input ?? [], fetcher, ctx?.swrOptions);
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
