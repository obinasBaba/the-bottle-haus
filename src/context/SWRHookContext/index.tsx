import { Fetcher, MutationHook, SWRHook } from '@/types/SWRHooks';
import { Cart, Checkout, Customer, Login, Logout, Product, Signup, Wishlist } from '@/types';
import { createContext, MutableRefObject, ReactNode, useContext, useMemo, useRef } from 'react';
import { saleorProvider } from '@/SWRHooksAPI';

export type CommerceConfig = {
  locale: string;
  cartCookieKey: string;
};

export type Provider = CommerceConfig & {
  fetcher: Fetcher;
  products?: {
    useSearch?: SWRHook<Product.SearchProductsHook>;
  };
  cart?: {
    useCart?: SWRHook<Cart.GetCartHook>;
    useAddItem?: MutationHook<Cart.AddItemHook>;
    useUpdateItem?: MutationHook<Cart.UpdateItemHook>;
    useRemoveItem?: MutationHook<Cart.RemoveItemHook>;
  };
  checkout?: {
    useCheckout?: SWRHook<Checkout.GetCheckoutHook>;
    useSubmitCheckout?: MutationHook<Checkout.SubmitCheckoutHook>;
  };
  wishlist?: {
    useWishlist?: SWRHook<Wishlist.GetWishlistHook>;
    useAddItem?: MutationHook<Wishlist.AddItemHook>;
    useRemoveItem?: MutationHook<Wishlist.RemoveItemHook>;
  };
  customer?: {
    useCustomer?: SWRHook<Customer.CustomerHook>;
    card?: {
      useCards?: SWRHook<Customer.Card.GetCardsHook>;
      useAddItem?: MutationHook<Customer.Card.AddItemHook>;
      useUpdateItem?: MutationHook<Customer.Card.UpdateItemHook>;
      useRemoveItem?: MutationHook<Customer.Card.RemoveItemHook>;
    };
    address?: {
      useAddresses?: SWRHook<Customer.Address.GetAddressesHook>;
      useAddItem?: MutationHook<Customer.Address.AddItemHook>;
      useUpdateItem?: MutationHook<Customer.Address.UpdateItemHook>;
      useRemoveItem?: MutationHook<Customer.Address.RemoveItemHook>;
    };
  };
  auth?: {
    useSignup?: MutationHook<Signup.SignupHook>;
    useLogin?: MutationHook<Login.LoginHook>;
    useLogout?: MutationHook<Logout.LogoutHook>;
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

  const { cartCookieKey, locale } = providerRef.current;

  // If the parent re-renders this provider will re-render every
  // consumer unless we memoize the config
  const cfg = useMemo(
    () => ({ providerRef, fetcherRef, cartCookieKey, locale }),
    [locale, cartCookieKey],
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
