import { Category } from '@/types/site';
import * as query from './queries';
import { CollectionCountableEdge } from '@/schema';
import { CommerceAPIConfig } from '@/types/operations';

const getCategories = async (config: CommerceAPIConfig): Promise<Category[]> => {
  const { data } = await config.fetch(query.CollectionMany, {
    variables: {
      first: 100,
    },
  });

  return (
    data.collections?.edges?.map(({ node: { id, name, slug } }: CollectionCountableEdge) => ({
      id,
      name,
      slug,
      path: `/${slug}`,
    })) ?? []
  );
};

export default getCategories;
