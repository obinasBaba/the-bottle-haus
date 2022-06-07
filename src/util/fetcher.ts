import { API_URL } from '@/const';
import { Fetcher } from '@/types/SWRHooks';
import { getToken, handleFetchResponse } from '@/util/index';

const fetcher: Fetcher = async ({ url = API_URL, method = 'POST', variables, query }) => {
  const token = getToken();

  return handleFetchResponse(
    await fetch(url!, {
      method,
      body: JSON.stringify({ query, variables }),
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    }),
  );
};

export default fetcher;
