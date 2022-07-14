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
  }: {
    query?: string;
    variables?: any;
    config?: Partial<CommerceAPIConfig>;
    preview?: boolean;
    featured?: boolean;
  } = {}): Promise<GetAllProductsOperation['data']> {
    // variables = getSearchVariables(variables);

    const data = await fetcher({
      variables,
      query,
    });

    return (
      data?.products?.edges?.map(({ node: p }: ProductCountableEdge) => normalizeProduct(p)) ?? []
    );
  }

  return getAllProducts;
}
