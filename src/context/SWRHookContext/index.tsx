import { Fetcher, SWRHook } from '@/types/SWRHooks';
import { Product } from '@/types';
import { createContext, MutableRefObject, ReactNode, useContext, useMemo, useRef } from 'react';
import { saleorProvider } from '@/SWRHooksAPI';

export type CommerceConfig = {
  locale: string;
  cartCookie: string;
};

export type Provider = CommerceConfig & {
  fetcher: Fetcher;
  products?: {
    useSearch?: SWRHook<Product.SearchProductsHook>;
  };
};

// 👉🏾 this equal to CommerceConfig + Provider + Fetcher. 😉
export type CommerceContextValue<P extends Provider = Provider> = {
  providerRef: MutableRefObject<P>;
  fetcherRef: MutableRefObject<Fetcher>;
};

const Commerce = createContext<CommerceContextValue | Record<string, any>>({});

type CommerceProps<P extends Provider> = {
  children?: ReactNode;
  provider: P;
};

export function CoreCommerceProvider<P extends Provider>({ provider, children }: CommerceProps<P>) {
  const providerRef = useRef(provider);
  const fetcherRef = useRef(provider.fetcher);

  const { cartCookie, locale } = providerRef.current;

  // If the parent re-renders this provider will re-render every
  // consumer unless we memoize the config
  const cfg = useMemo(
    () => ({ providerRef, fetcherRef, cartCookie, locale }),
    [locale, cartCookie],
  );

  return <Commerce.Provider value={cfg}>{children}</Commerce.Provider>;
}

type CommerceProviderProps = {
  children: ReactNode;
} & Partial<CommerceConfig>;

export function getCommerceProvider() {
  return function CommerceProvider({ children, ...props }: CommerceProviderProps) {
    return (
      <CoreCommerceProvider provider={{ ...saleorProvider, ...props }}>
        {children}
      </CoreCommerceProvider>
    );
  };
}

export function useCommerce<P extends Provider>() {
  // casting to exclude the initial {} empty type
  return useContext(Commerce) as CommerceContextValue<P>;
}
