import { PageCountableEdge, QueryPagesArgs } from '@/schema';
import * as Query from '../util/queries';
import { CommerceAPIConfig, OperationContext, Operations, Provider } from '@/types/operations';
import { GetAllPagesOperation } from '@/types/page';

export type Page = any;

export type GetAllPagesResult<T extends { pages: any[] } = { pages: Page[] }> = T;

export default function getAllPagesOperation({ commerce }: OperationContext) {
  async function getAllPages({
    query = Query.PageMany,
    config,
    variables,
  }: {
    url?: string;
    config?: Partial<CommerceAPIConfig>;
    variables?: QueryPagesArgs;
    preview?: boolean;
    query?: string;
  } = {}): Promise<GetAllPagesOperation['data']> {
    const { fetch, locale, locales = ['en-US'] } = commerce.getConfig(config);

    const { data } = await fetch(
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

    const pages = data.pages?.edges?.map(
      ({ node: { title: name, slug, ...node } }: PageCountableEdge) => ({
        ...node,
        url: `/${locale}/${slug}`,
        name,
      }),
    );

    return { pages };
  }

  return getAllPages;
}
