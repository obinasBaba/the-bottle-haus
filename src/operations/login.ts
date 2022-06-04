import type { ServerResponse } from 'http';
import { throwUserErrors } from '@/util';

import * as Mutation from '@/util/mutations';
import { CommerceAPIConfig, OperationContext, Provider } from '@/types/operations';

export default function loginOperation({ commerce }: OperationContext) {
  async function login({
    query = Mutation.SessionCreate,
    variables,
    config,
  }: {
    query?: string;
    variables: any;
    res: ServerResponse;
    config?: CommerceAPIConfig;
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
