/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain,@typescript-eslint/no-non-null-assertion */

import { Product } from '@/types/product';

import { Checkout, CheckoutLine, Money, Product as SaleorProduct, ProductVariant } from '@/schema';

import type { Cart as CoreCart } from '@/types';
import type { LineItem as LineItemMain } from '@/types/cart';

interface LineItem extends LineItemMain {
  options?: any[];
}

type Cart = CoreCart.Cart & {
  lineItems: LineItem[];
};

// TODO: Check nextjs-commerce bug if no images are added for a product
const placeholderImg = '/product-img-placeholder.svg';

const money = ({ amount, currency }: Money) => {
  return {
    value: +amount,
    currencyCode: currency || 'USD',
  };
};

const normalizeProductOptions = (options: ProductVariant[]) => {
  return options
    ?.map((option) => option?.attributes)
    .flat(1)
    .reduce<any>((acc, { attribute, values }) => {
      return;
      if (!attribute) return;
      if (acc.find(({ displayName }: any) => displayName === attribute.name)) {
        return acc.map((opt: any) => {
          return opt.displayName === attribute.name
            ? {
                ...opt,
                values: [
                  ...opt.values,
                  ...values.map((value: any) => ({
                    label: value?.name,
                  })),
                ],
              }
            : opt;
        });
      }

      return acc.concat({
        __typename: 'MultipleChoiceOption',
        displayName: attribute.name,
        variant: 'size',
        values: values.map((value: any) => ({
          label: value?.name,
        })),
      });
    }, []);
};

const normalizeProductVariants = (variants: ProductVariant[]) => {
  return variants?.map((variant) => {
    const { id, sku, name, pricing, quantityAvailable } = variant;
    const price = (pricing?.price?.net && money(pricing.price.net)?.value) || null;

    return {
      id,
      name,
      availableForSale: quantityAvailable > 0,
      sku: sku ?? id,
      price,
      listPrice: price,
      requiresShipping: true,
      options: [], // options: normalizeProductOptions([variant]),
    };
  });
};

export function normalizeProduct(productNode: SaleorProduct): Product {
  const {
    id,
    name,
    media = [],
    variants,
    description,
    slug,
    pricing,
    attributes,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor: '',
    description: description ? JSON.parse(description)?.blocks[0]?.data.text : '',
    path: `/${slug}`,
    slug: slug?.replace(/^\/+|\/+$/g, ''),
    price: (pricing?.priceRange?.start?.net && {
      ...money(pricing.priceRange.start.net),
      discount: pricing?.discount?.net?.amount || 0,
    }) || {
      discount: 0,
      value: 0,
      currencyCode: 'USD',
    }, // TODO: Check nextjs-commerce bug if no images are added for a product
    images: media?.length ? media : [{ url: placeholderImg }],
    isAvailable: productNode.isAvailable,
    defaultVariants: productNode.defaultVariant || null,
    variants:
      variants && variants.length > 0 ? normalizeProductVariants(variants as ProductVariant[]) : [],
    options: [],
    collections: productNode?.collections || [],
    subTitle: (attributes && attributes[0]?.values[0]?.name) || '-',
    ...rest,
  };

  return product as Product;
}

function normalizeLineItem({ id, variant, quantity }: CheckoutLine): LineItem {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: `${variant.product.name}`,
    quantity,
    variant: {
      id: String(variant?.id),
      product: variant.product,
      sku: variant?.sku ?? '',
      name: variant?.name!,
      image: {
        url: variant?.media![0] ? variant?.media![0].url : placeholderImg,
      },
      requiresShipping: false,
      price: variant?.pricing?.price?.gross.amount!,
      listPrice: 0,
    },
    path: String(variant?.product?.slug),
    discounts: [],
    options: [],
  };
}

export function normalizeCart(checkout: Checkout): Cart {
  const lines = checkout.lines as CheckoutLine[];
  const lineItems: LineItem[] = lines.length > 0 ? lines?.map<LineItem>(normalizeLineItem) : [];

  return {
    id: checkout.id,
    customerId: '',
    email: '',
    createdAt: checkout.created,
    currency: {
      code: checkout.totalPrice?.currency!,
    },
    taxesIncluded: false,
    lineItems,
    lineItemsSubtotalPrice: checkout.subtotalPrice?.gross?.amount!,
    subtotalPrice: checkout.subtotalPrice?.gross?.amount!,
    totalPrice: checkout.totalPrice?.gross.amount!,
    discounts: [],
  };
}
