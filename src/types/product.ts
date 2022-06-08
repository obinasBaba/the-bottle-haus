import { ProductFilterInput } from '@/schema';

export type ProductImage = {
  url: string;
  alt?: string;
};

export type ProductPrice = {
  value: number;
  discount: number;
  currencyCode?: 'USD' | 'EUR' | 'ARS' | 'GBP' | string;
  retailPrice?: number;
  salePrice?: number;
  listPrice?: number;
  extendedSalePrice?: number;
  extendedListPrice?: number;
};

export type ProductOption = {
  __typename?: 'MultipleChoiceOption';
  id: string;
  displayName: string;
  values: ProductOptionValues[];
};

export type ProductOptionValues = {
  label: string;
  hexColors?: string[];
};

export type ProductVariant = {
  id: string | number;
  options: ProductOption[];
  availableForSale?: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  descriptionHtml?: string;
  sku?: string;
  slug?: string;
  path?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  price: ProductPrice;
  options: ProductOption[];
  vendor?: string;
};

export type SearchProductsBody = {
  categoryId?: string | number;
  first?: number;
  filter?: ProductFilterInput;
  sort?: string;
  locale?: string;
};

export type ProductTypes = {
  product: Product;
  searchBody: SearchProductsBody;
};

export type SearchProductsHook<T extends ProductTypes = ProductTypes> = {
  data: {
    products: T['product'][];
    found: boolean;
  };
  body: T['searchBody'];
  input: T['searchBody'];
  fetcherInput: T['searchBody'];
  // fetchData: {}
};

export type ProductsSchema<T extends ProductTypes = ProductTypes> = {
  endpoint: {
    options: Record<string, unknown>;
    handlers: {
      getProducts: SearchProductsHook<T>;
    };
  };
};

export type GetAllProductPathsOperation<T extends ProductTypes = ProductTypes> = {
  data: { products: Pick<T['product'], 'path'>[] };
  variables: { first?: number };
};

export type GetAllProductsOperation<T extends ProductTypes = ProductTypes> = {
  data: { products: T['product'][] };
  variables: {
    relevance?: 'featured' | 'best_selling' | 'newest';
    ids?: string[];
    first?: number;
  };
};

export type GetProductOperation<T extends ProductTypes = ProductTypes> = {
  data: { product?: T['product'] | null };
  variables: { path: string; slug?: never } | { path?: never; slug: string };
};
