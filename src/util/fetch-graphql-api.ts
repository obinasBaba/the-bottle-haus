import zeitFetch from '@vercel/fetch';

import { API_URL } from '@/const';
import { getApiOperations } from '@/operations';
import { getError } from '@/util/handle-fetch-response';
import { getToken } from '@/util/customer-token';
import { GraphQLFetcher } from '@/types/fetcher';

const fetch = zeitFetch();

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions,
) => {
  const config = getApiOperations().getConfig();
  const token = getToken(); // accessing the cookie via js-cookie

  const res = await fetch(API_URL!, {
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

  const { data, errors, status } = await res.json();

  if (errors) {
    throw getError(errors, status);
  }

  return { data, res };
};
export default fetchGraphqlApi;
