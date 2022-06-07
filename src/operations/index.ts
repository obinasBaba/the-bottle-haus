import {
  AllOperations,
  APIProvider,
  CommerceAPI,
  CommerceAPIConfig,
  CommerceAPICore,
  defaultOperations,
  OPERATIONS,
} from '@/types/operations';
import * as Const from '@/const';
import fetchGraphqlApi from '@/util/fetch-graphql-api';

import { default as getAllPages } from './get-all-pages';
import { default as getPage } from './get-page';
import { default as getAllProducts } from './get-all-products';
import { default as getAllProductPaths } from './get-all-product-paths';
import { default as getProduct } from './get-product';
import { default as getSiteInfo } from './get-site-info';
import { default as login } from './login';

const operations = {
  getAllPages,
  getPage,
  getAllProductPaths,
  getAllProducts,
  getSiteInfo,
  login,
  getProduct,
};

if (!Const.API_URL) {
  throw new Error(
    "The environment variable NEXT_SALEOR_API_URL is missing and it's required to access your store",
  );
}

if (!Const.API_CHANNEL) {
  throw new Error(
    "The environment variable NEXT_SALEOR_CHANNEL is missing and it's required to access your store",
  );
}

// this is the main config object
const config: CommerceAPIConfig = {
  locale: 'en-US',
  commerceUrl: Const.API_URL,
  apiToken: Const.SALEOR_TOKEN,
  cartCookie: Const.CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: 60 * 60 * 24 * 30,
  fetch: fetchGraphqlApi,
  customerCookie: '',
  storeChannel: Const.API_CHANNEL,
};

// this is the main provider object that contain all the config and api-operations together
export const provider = { config, operations };

export function getApiOperations<P extends APIProvider = APIProvider>(
  customProvider: P = provider as any,
): CommerceAPI<P> {
  const commerce = Object.assign(new CommerceAPICore(customProvider.config));

  const ops = customProvider.operations; // operations with wrapper functions that has access to context object ({commerce: APIOperations})

  OPERATIONS.forEach((k) => {
    const op = ops[k];
    if (op) {
      commerce[k] = op({
        commerce /* : OperationContext */,
      });
    }
  });

  return commerce;
}
