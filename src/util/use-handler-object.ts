import { useCallback } from 'react';
import { Provider, useCommerce } from '@/context/SWRHookContext';
import type {
  MutationHook,
  MutationSchemaBase,
  PickRequired,
  SWRHook,
  SWRHookSchemaBase,
} from '@/types/SWRHooks';
import useSwrCaller from './use-swr';

export function useFetcher() {
  const { providerRef, fetcherRef } = useCommerce();
  return providerRef.current.fetcher ?? fetcherRef.current;
}

export function useHandlerObject<P extends Provider, H extends MutationHook<any> | SWRHook<any>>(
  fn: (provider: P) => H,
) {
  const { providerRef } = useCommerce<P>();
  const provider = providerRef?.current;
  return fn(provider);
}

export function useSWRHook<S extends SWRHookSchemaBase, H extends SWRHook<S> = SWRHook<S>>(
  options: PickRequired<H, 'fetcher'>,
) {
  const globalFetcher = useFetcher(); // global common fetcher

  return options.useHook({
    fetcherWrapper: function (ctx) {
      return useSwrCaller(options, ctx?.input ?? [], globalFetcher, ctx?.swrOptions);
    },
  });
}

export function useMutationHook<
  S extends MutationSchemaBase,
  H extends MutationHook<S> = MutationHook<S>,
>(hook: PickRequired<H, 'fetcher'>) {
  const globalFetcher = useFetcher();

  return hook.useHook({
    fetcherWrapper: useCallback(
      ({ input }) => {
        return hook.fetcher({
          input,
          options: hook.fetchOptions,
          fetch: globalFetcher,
        });
      },
      [globalFetcher, hook],
    ),
  });
}
