import { ValidationError } from './errors';

import {
  AccountError,
  AccountErrorCode,
  AppError,
  CheckoutError,
  CheckoutErrorCode,
} from '@/schema';

export type UserErrors = Array<CheckoutError | AccountError | AppError>;

export type UserErrorCode = CheckoutErrorCode | AccountErrorCode | null | undefined;

export const throwUserErrors = (errors?: UserErrors) => {
  if (errors && errors.length) {
    throw new ValidationError({
      errors: errors.map(({ code, message }) => ({
        code: code ?? 'validation_error',
        message: message || '',
      })),
    });
  }
};

export default throwUserErrors;
