import type { ServerResponse } from 'http';
import type { LoginOperation } from '../login';
import type { GetAllPagesOperation, GetPageOperation } from '../page';
import type { GetSiteInfoOperation } from '../site';
import type { GetCustomerWishlistOperation } from '../wishlist';
import type {
  GetAllProductPathsOperation,
  GetAllProductsOperation,
  GetProductOperation,
} from '../product';
import { provider } from '@/operations';
import { GraphQLFetcher } from '@/types/fetcher';

const noop = () => {
  throw new Error('Not implemented');
};

export const OPERATIONS = [
  'login',
  'getAllPages',
  'getPage',
  'getSiteInfo',
  'getCustomerWishlist',
  'getAllProductPaths',
  'getAllProducts',
  'getProduct',
] as const; // 'as const' means make the array 'readonly []'

export type AllowedOperations = typeof OPERATIONS[number];

// all operation mapped to placeholder function 'noop' for first time
export const defaultOperations = OPERATIONS.reduce((ops, k) => {
  ops[k] = noop;
  return ops;
}, {} as { [K in AllowedOperations]: typeof noop });

export type OperationOptions =
  | { query: string; url?: never }
  | { query?: never; url: string };

// the main operations types
export type Operations<P extends APIProvider> = {
  login: {
    <T extends LoginOperation>(opts: {
      variables: T['variables'];
      config?: P['config'];
      res: ServerResponse;
    }): Promise<T['data']>;

    <T extends LoginOperation>(
      opts: {
        variables: T['variables'];
        config?: P['config'];
        res: ServerResponse;
      } & OperationOptions,
    ): Promise<T['data']>;
  };

  getAllPages: {
    <T extends GetAllPagesOperation>(opts?: {
      config?: P['config'];
      preview?: boolean;
    }): Promise<T['data']>;

    <T extends GetAllPagesOperation>(
      opts: {
        config?: P['config'];
        preview?: boolean;
      } & OperationOptions,
    ): Promise<T['data']>;
  };

  getPage: {
    <T extends GetPageOperation>(opts: {
      variables: T['variables'];
      config?: P['config'];
      preview?: boolean;
    }): Promise<T['data']>;

    <T extends GetPageOperation>(
      opts: {
        variables: T['variables'];
        config?: P['config'];
        preview?: boolean;
      } & OperationOptions,
    ): Promise<T['data']>;
  };

  getSiteInfo: {
    <T extends GetSiteInfoOperation>(opts: {
      config?: P['config'];
      preview?: boolean;
    }): Promise<T['data']>;

    <T extends GetSiteInfoOperation>(
      opts: {
        config?: P['config'];
        preview?: boolean;
      } & OperationOptions,
    ): Promise<T['data']>;
  };

  getCustomerWishlist: {
    <T extends GetCustomerWishlistOperation>(opts: {
      variables: T['variables'];
      config?: P['config'];
      includeProducts?: boolean;
    }): Promise<T['data']>;

    <T extends GetCustomerWishlistOperation>(
      opts: {
        variables: T['variables'];
        config?: P['config'];
        includeProducts?: boolean;
      } & OperationOptions,
    ): Promise<T['data']>;
  };

  getAllProductPaths: {
    <T extends GetAllProductPathsOperation>(opts: {
      variables?: T['variables'];
      config?: P['config'];
    }): Promise<T['data']>;

    <T extends GetAllProductPathsOperation>(
      opts: {
        variables?: T['variables'];
        config?: P['config'];
      } & OperationOptions,
    ): Promise<T['data']>;
  };

  getAllProducts: {
    <T extends GetAllProductsOperation>(opts: {
      variables?: T['variables'];
      config?: P['config'];
      preview?: boolean;
    }): Promise<T['data']>;

    <T extends GetAllProductsOperation>(
      opts: {
        variables?: T['variables'];
        config?: P['config'];
        preview?: boolean;
      } & OperationOptions,
    ): Promise<T['data']>;
  };

  getProduct: {
    <T extends GetProductOperation>(opts: {
      variables: T['variables'];
      config?: P['config'];
      preview?: boolean;
    }): Promise<T['data']>;

    <T extends GetProductOperation>(
      opts: {
        variables: T['variables'];
        config?: P['config'];
        preview?: boolean;
      } & OperationOptions,
    ): Promise<T['data']>;
  };
};

// mapping every operation key with a wrapper function that have 'ctx' arg which return the value of each operation key ( function )
export type APIOperations<P extends APIProvider> = {
  [K in keyof Operations<P>]?: (ctx: OperationContext<P>) => Operations<P>[K];
};

// '-?' covert all properties that are optional to required property.
// If an operation is assignable to a function( if it is a function ) map it to its value else to 'noop'
// This is just making every 'APIOperations' optional properties required.
// this is same as to 'Operations<K>' type
export type AllOperations<P extends APIProvider> = {
  [K in keyof APIOperations<P>]-?: P['operations'][K] extends (
    ...args: any
  ) => any
    ? ReturnType<P['operations'][K]>
    : typeof noop;
};

export interface CommerceAPIConfig {
  locale?: string;
  locales?: string[];
  commerceUrl: string;
  apiToken: string;
  cartCookie: string;
  cartCookieMaxAge: number;
  customerCookie: string;
  fetch: GraphQLFetcher; // fetcher for operations
  storeChannel: string;
}

export type APIProvider = {
  config: CommerceAPIConfig;
  operations: APIOperations<any>;
};

export type Provider = typeof provider;

export class CommerceAPICore<P extends APIProvider = APIProvider> {
  constructor(readonly provider: P) {}

  // 'Partial' makes it all property in config obj optional.
  // 👉🏾 this is just merging the passed custom user config with the initial default config properties
  getConfig(userConfig: Partial<P['config']> = {}): P['config'] {
    return Object.entries(userConfig).reduce(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.provider.config },
    );
  }

  setConfig(newConfig: Partial<P['config']>) {
    Object.assign(this.provider.config, newConfig);
  }
}

export type CommerceAPI<P extends APIProvider = APIProvider> =
  CommerceAPICore<P> & AllOperations<P>;

export type OperationContext<P extends APIProvider> = {
  commerce: CommerceAPI<P>;
};
