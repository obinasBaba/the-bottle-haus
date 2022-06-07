import { Category, GetSiteInfoOperation } from '@/types/site';

import { getCategories, getVendors } from '@/util';
import { CommerceAPIConfig, OperationContext, Provider } from '@/types/operations';

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

    const categories = await getCategories(cfg);
    const brands = await getVendors(cfg);

    return {
      categories,
      brands,
    };
  }

  return getSiteInfo;
}
