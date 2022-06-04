import { QueryPageArgs } from '@/schema';

import * as Query from '@/util/queries';
import { CommerceAPIConfig, OperationContext } from '@/types/operations';

export type Page = any;

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T;

export default function getPageOperation({ commerce }: OperationContext) {
  async function getPage({
    query = Query.PageOne,
    variables,
    config,
  }: {
    query?: string;
    variables: QueryPageArgs;
    config?: Partial<CommerceAPIConfig>;
    preview?: boolean;
  }): Promise<GetPageResult> {
    // get the 'config' file by merging it with custom passed config properties
    const { fetch, locale = 'en-US' } = commerce.getConfig(config);

    const {
      data: { page },
    } = await fetch(
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

    return {
      page: page
        ? {
            ...page,
            name: page.title,
            url: `/${locale}/${page.slug}`,
          }
        : null,
    };
  }

  return getPage;
}
