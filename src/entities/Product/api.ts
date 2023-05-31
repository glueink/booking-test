import { api } from '@/shared';
import { parseProductList } from './guards';

export const getProductListApi = async () => {
  const response = await api('/api/products.json');
  const data = parseProductList(response.data);
  return data;
};
