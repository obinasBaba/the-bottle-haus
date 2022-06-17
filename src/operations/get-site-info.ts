import { Category, GetSiteInfoOperation } from '@/types/site';

import { getCollection } from '@/util';
import { CommerceAPIConfig, OperationContext } from '@/types/operations';

interface GetSiteInfoResult {
  categories: Category[];
  brands: any[];
}

export default function getSiteInfoOperation({ commerce }: OperationContext) {
  async function getSiteInfo({
    query,
    config,
    variables,
  }: {
    query?: string;
    config?: Partial<CommerceAPIConfig>;
    preview?: boolean;
    variables?: any;
  } = {}): Promise<GetSiteInfoOperation['data']> {
    const cfg = commerce.getConfig(config);

    const collections = await getCollection(cfg);

    return {
      collections,
      categories: [],
    };
  }

  return getSiteInfo;
}
