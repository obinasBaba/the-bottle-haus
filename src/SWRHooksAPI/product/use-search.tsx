import { HookFetcherFn, SWRHook } from '@/types/SWRHooks';
import { SearchProductsHook } from '@/types/product';
import * as query from '@/util/queries';
import getSearchVariables from '@/util/get-search-variables';
import { ProductCountableEdge } from '@/schema';
import { normalizeProduct } from '@/util';
import { useHook, useSWRHook } from '@/util/use-hook';
import { Provider } from '@/context/SWRHookContext';
import SWRFetcher from '@/util/default-fetcher';

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    query: query.ProductMany,
  },
  async fetcher({ options, input, fetch }) {
    const { categoryId } = input;

    const data = await fetch({
      query: categoryId ? query.CollectionOne : options.query,
      method: options.method,
      variables: getSearchVariables(input),
    });

    // console.log('fetcherData :', data, 'variables: ',  input.filter);

    let edges;

    if (categoryId) {
      edges = data.collection?.products?.edges ?? [];
    } else {
      edges = data.products?.edges ?? [];
    }

    return {
      products: edges.map(({ node }: ProductCountableEdge) => normalizeProduct(node)),
      found: !!edges.length, // converting to truthy
    };
  },
  useHook:
    ({ fetchData }) =>
    (input = {}) => {
      return fetchData({
        input: [
          ['first', input.first],
          ['filter', input.filter],
          ['categoryId', input.categoryId],
          ['sort', input.sort],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      });
    },
};

type UseSearchType<H extends SWRHook<SearchProductsHook> = SWRHook<SearchProductsHook>> =
  ReturnType<H['useHook']>;

const fn = (p: Provider) => p.products?.useSearch!;

const fetcher: HookFetcherFn<SearchProductsHook> = SWRFetcher;

const useSearch: UseSearchType = (input) => {
  const options = useHook(fn);
  return useSWRHook({ fetcher, ...options })(input);
};

export default useSearch as UseSearchType<typeof handler>;
