import { ProductCountableEdge } from '@/schema';
import { CommerceAPIConfig } from '@/types/operations';

type Props = {
  config: CommerceAPIConfig;
  query: string;
  acc?: ProductCountableEdge[];
  variables?: any;
  cursor?: string;
};

const fetchAllProducts = async ({
  config,
  query,
  variables,
  acc = [],
  cursor,
}: Props): Promise<ProductCountableEdge[]> => {
  const { data } = await config.fetch(query, {
    variables: { ...variables, cursor },
  });

  const edges: ProductCountableEdge[] = data.products?.edges ?? [];
  const hasNextPage = data.products?.pageInfo?.hasNextPage;
  acc = acc.concat(edges);

  if (hasNextPage) {
    const cursor = edges.pop()?.cursor;
    if (cursor) {
      return fetchAllProducts({
        config,
        query,
        variables,
        acc,
        cursor,
      });
    }
  }

  return acc;
};

export default fetchAllProducts;
