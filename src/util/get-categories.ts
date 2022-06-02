import { Category } from '@/types/site';
import * as query from './queries';
import { SaleorConfig } from '@/operations';
import { CollectionCountableEdge } from '@/schema';

const getCategories = async (config: SaleorConfig): Promise<Category[]> => {
  const { data } = await config.fetch(query.CollectionMany, {
    variables: {
      first: 100,
    },
  });

  return (
    data.collections?.edges?.map(
      ({ node: { id, name, slug } }: CollectionCountableEdge) => ({
        id,
        name,
        slug,
        path: `/${slug}`,
      }),
    ) ?? []
  );
};

export default getCategories;
