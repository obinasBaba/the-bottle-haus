import { FetchOptions, Response } from '@vercel/fetch';

export interface GraphQLFetcherResult<Data = any> {
  data: Data;
  res: Response;
}

export interface CommerceAPIFetchOptions<Variables> {
  variables?: Variables;
  preview?: boolean;
}

export type GraphQLFetcher<
  Data extends GraphQLFetcherResult = GraphQLFetcherResult,
  Variables = any,
> = (
  query: string,
  queryData?: CommerceAPIFetchOptions<Variables>,
  fetchOptions?: FetchOptions,
) => Promise<Data>;
