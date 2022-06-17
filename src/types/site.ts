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
  data: {
    collections: Collection[];
    categories: T['category'][];
  };
};
