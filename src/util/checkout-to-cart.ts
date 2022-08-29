import { Cart } from '../types';

import {
  Checkout,
  CheckoutCreate,
  CheckoutError,
  CheckoutLineDelete,
  CheckoutLinesAdd,
  CheckoutLinesUpdate,
  Maybe,
} from '@/schema';

import { normalizeCart } from './normalize';
import throwUserErrors from './throw-user-errors';
import { CommerceError } from '@/util/errors';

export type CheckoutQuery = {
  checkout: Checkout;
  errors?: Array<CheckoutError>;
};

export type CheckoutPayload =
  | CheckoutLinesAdd
  | CheckoutLinesUpdate
  | CheckoutCreate
  | CheckoutQuery
  | CheckoutLineDelete;

const checkoutToCart = (checkoutPayload?: Maybe<CheckoutPayload>): Cart.Cart => {
  if (!checkoutPayload) {
    throw new CommerceError({
      message: 'Missing checkout payload from response',
    });
  }

  const checkout = checkoutPayload?.checkout;
  throwUserErrors(checkoutPayload?.errors);

  if (!checkout) {
    throw new CommerceError({
      message: 'Missing checkout object from response ----- >',
    });
  }

  return normalizeCart(checkout);
};

export default checkoutToCart;
