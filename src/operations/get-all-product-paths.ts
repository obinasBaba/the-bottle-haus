import { CommerceAPIConfig, OperationContext } from '@/types/operations';
import { getAllProductsPathsQuery } from '@/util/queries';
import fetchAllProducts from '@/util/fetch-all-products';
import { ProductCountableEdge } from '@/schema';

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>;
};

export default function getAllProductPathsOperation({ commerce }: OperationContext) {
  async function getAllProductPaths({
    query,
    config,
    variables,
  }: {
    query?: string;
    config?: CommerceAPIConfig;
    variables?: any;
  } = {}): Promise<GetAllProductPathsResult> {
    config = commerce.getConfig(config);

    const products = await fetchAllProducts({
      config,
      query: getAllProductsPathsQuery,
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
