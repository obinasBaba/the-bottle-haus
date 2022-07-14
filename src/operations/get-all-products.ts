import { GetAllProductsOperation, Product } from '@/types/product';
import { CommerceAPIConfig, OperationContext } from '@/types/operations';
import * as Query from '@/util/queries';
import { ProductCountableEdge } from '@/schema';
import { normalizeProduct } from '@/util/normalize';
import { GraphQLFetcherResult } from '@/types/fetcher';
import fetcher from '@/util/fetcher';

type ReturnType = {
  products: Product[];
};

export default function getAllProductsOperation({ commerce }: OperationContext) {
  async function getAllProducts({
    query = Query.ProductMany,
    variables,
    config,
    featured,
  }: {
    query?: string;
    variables?: any;
    config?: Partial<CommerceAPIConfig>;
    preview?: boolean;
    featured?: boolean;
  } = {}): Promise<GetAllProductsOperation['data']> {
    const { fetch, locale } = commerce.getConfig(config);

    console.log('variables: ', variables);

    // variables = getSearchVariables(variables);

    const data = await fetcher({
      variables,
      query,
    });

    console.log('data: ', data);

    return (
      data?.products?.edges?.map(({ node: p }: ProductCountableEdge) => normalizeProduct(p)) ?? []
    );
  }

  return getAllProducts;
}
