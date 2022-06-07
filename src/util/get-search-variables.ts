import { getSortVariables } from '@/util/get-sort-variables';
import { SearchProductsBody } from '@/types/product';

export const getSearchVariables = ({ brandId, search, categoryId, sort }: SearchProductsBody) => {
  const sortBy = {
    field: 'NAME',
    direction: 'ASC',
    ...getSortVariables(sort, !!categoryId),
    channel: 'default-channel',
  };
  return {
    categoryId,
    filter: { search },
    sortBy,
  };
};

export default getSearchVariables;
