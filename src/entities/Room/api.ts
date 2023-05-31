import { api } from '@/shared';
import { parseRoomList } from './guards';

export const getRoomListApi = async () => {
  const response = await api('/api/property.json');
  const data = parseRoomList(response);
  return data;
};
