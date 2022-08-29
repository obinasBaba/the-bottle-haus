import { getSortVariables } from '@/util/get-sort-variables';
import { SearchProductsBody } from '@/types/product';

export const getSearchVariables = ({ first, filter, categoryId, sort }: SearchProductsBody) => {
  const sortBy = {
    field: 'NAME',
    direction: 'ASC',
    ...getSortVariables(sort, !!categoryId),
    channel: 'default-channel',
  };
  return {
    categoryId,
    first,
    filter,
    sortBy,
  };
};

export default getSearchVariables;
