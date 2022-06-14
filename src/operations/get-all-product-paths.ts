import {
  AllOperations,
  APIOperations,
  CommerceAPIConfig,
  OperationContext,
  Operations,
} from '@/types/operations';
import { getAllProductsPathsQuery } from '@/util/queries';
import fetchAllProducts from '@/util/fetch-all-products';
import { ProductCountableEdge } from '@/schema';
import { GetAllProductPathsOperation } from '@/types/product';

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>;
};

export default function getAllProductPathsOperation({ commerce }: OperationContext) {
  async function getAllProductPaths({
    query = getAllProductsPathsQuery,
    config,
    variables,
  }: {
    query?: string;
    config?: CommerceAPIConfig;
    variables?: any;
  } = {}): Promise<GetAllProductPathsOperation['data']> {
    config = commerce.getConfig(config);

    const products = await fetchAllProducts({
      config,
      query,
      variables,
    });

    return {
      products: products?.map(({ node: { slug } }: ProductCountableEdge) => ({
        path: `/${slug}`,
      })),
    };
  }

  return getAllProductPaths;
}
