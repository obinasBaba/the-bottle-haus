import * as query from './queries';
import { Collection, CollectionCountableEdge } from '@/schema';
import { CommerceAPIConfig } from '@/types/operations';

const getCollection = async (
  config: CommerceAPIConfig,
  variables: Record<string, any>,
): Promise<Collection[]> => {
  const { data } = await config.fetch(query.CollectionMany, {
    variables: {
      first: 100,
      ...variables,
    },
  });

  return (
    data.collections?.edges?.map(
      ({ node: { id, name, slug, backgroundImage } }: CollectionCountableEdge) => ({
        id,
        name,
        slug,
        path: `/${slug}`,
        backgroundImage,
      }),
    ) ?? []
  );
};

export default getCollection;
