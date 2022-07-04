import { Category } from '@/types/site';

import { getCollection } from '@/util';
import { OperationContext, Operations } from '@/types/operations';

interface GetSiteInfoResult {
  categories: Category[];
  brands: any[];
}

export default function getSiteInfoOperation({
  commerce,
}: OperationContext): Operations['getSiteInfo'] {
  return async ({ query, config, variables }) => {
    const cfg = commerce.getConfig(config);

    const collections = await getCollection(cfg, variables || {});

    return {
      collections,
      categories: [],
    };
  };
}
