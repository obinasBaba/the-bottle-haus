import { Product } from '@/types/product';
import {
  GraphQLFetcherResult,
  OperationContext,
  Provider,
} from '@/types/operations';
import { SaleorConfig } from '@/operations/index';
import * as Query from '@/util/queries';
import { ProductCountableEdge } from '@/schema';
import { normalizeProduct } from '@/util/normalize';

type ReturnType = {
  products: Product[];
};

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts({
    query = Query.ProductMany,
    variables,
    config,
    featured,
  }: {
    query?: string;
    variables?: any;
    config?: Partial<SaleorConfig>;
    preview?: boolean;
    featured?: boolean;
  } = {}): Promise<ReturnType> {
    const { fetch, locale } = commerce.getConfig(config);

    if (featured) {
      variables = { ...variables, categoryId: 'Q2F0ZWdvcnk6MTA=' };
      query = Query.CollectionOne;
    }

    const { data }: GraphQLFetcherResult = await fetch(
      query,
      { variables },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      },
    );

    if (featured) {
      const products =
        data.collection.products?.edges?.map(
          ({ node: p }: ProductCountableEdge) => normalizeProduct(p),
        ) ?? [];

      return {
        products,
      };
    } else {
      const products =
        data.products?.edges?.map(({ node: p }: ProductCountableEdge) =>
          normalizeProduct(p),
        ) ?? [];

      return {
        products,
      };
    }
  }

  return getAllProducts;
}
