import { api } from '@/shared';
import { parsePropertyItem } from './guards';

export const getPropertyItemApi = async () => {
  const response = await api('/api/property.json');
  const data = parsePropertyItem(response);
  return data;
};
