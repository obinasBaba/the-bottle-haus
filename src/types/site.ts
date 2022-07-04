import { Collection } from '@/schema';

export type Category = {
  id: string;
  name: string;
  slug: string;
  path: string;
};

export type Brand = any;

export type SiteTypes = {
  category: Category;
  brand: Brand;
};

export type GetSiteInfoOperation<T extends SiteTypes = SiteTypes> = {
  variables: Record<string, any>;

  data: {
    collections: Collection[];
    categories: T['category'][];
  };
};
