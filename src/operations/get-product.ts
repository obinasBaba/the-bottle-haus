import * as Query from '@/util/queries';
import { CommerceAPIConfig, OperationContext, Provider } from '@/types/operations';
import { normalizeProduct } from '@/util/normalize';
import { GetProductOperation } from '@/types/product';

type Variables = {
  slug: string;
} & Record<string, string | number>;

type ReturnType = {
  product: any;
};

export default function getProductOperation({ commerce }: OperationContext) {
  async function getProduct({
    query = Query.ProductOneBySlug,
    variables,
    config: cfg,
  }: {
    query?: string;
    variables: Variables;
    config?: Partial<CommerceAPIConfig>;
    preview?: boolean;
  }): Promise<GetProductOperation['data']> {
    const { fetch, locale } = commerce.getConfig(cfg);

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

    return {
      product: data?.product ? normalizeProduct(data.product) : null,
    };
  }

  return getProduct;
}
