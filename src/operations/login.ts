import type { ServerResponse } from 'http';
import { throwUserErrors } from '@/util';

import * as Mutation from '@/util/mutations';
import { OperationContext, Provider } from '@/types/operations';
import { SaleorConfig } from '@/operations/index';

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login({
    query = Mutation.SessionCreate,
    variables,
    config,
  }: {
    query?: string;
    variables: any;
    res: ServerResponse;
    config?: SaleorConfig;
  }): Promise<any> {
    config = commerce.getConfig(config);

    const {
      data: { customerAccessTokenCreate },
    } = await config.fetch(query, { variables });

    throwUserErrors(customerAccessTokenCreate?.customerUserErrors);

    const customerAccessToken = customerAccessTokenCreate?.customerAccessToken;
    const accessToken = customerAccessToken?.accessToken;

    // if (accessToken) {
    //   setCustomerToken(accessToken)
    // }

    return {
      result: customerAccessToken?.accessToken,
    };
  }

  return login;
}
