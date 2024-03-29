import zeitFetch from '@vercel/fetch';

import { API_URL } from '@/const';
import { getApiOperations } from '@/operations';
import { getError } from '@/util/handle-fetch-response';
import { getToken } from '@/util/customer-token';
import { GraphQLFetcher } from '@/types/fetcher';

const _fetch = zeitFetch();

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions,
  fetcher?: any,
) => {
  const config = getApiOperations().getConfig();
  const token = getToken(); // accessing the cookie via js-cookie

  // console.log('config, token:', config, token);

  const res = await _fetch(API_URL!, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors, status } : any = await res.json();

  if (errors) {
    throw getError(errors, status);
  }

  return { data, res };
};
export default fetchGraphqlApi;
