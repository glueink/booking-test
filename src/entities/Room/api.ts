import { api } from '@/shared';
import { parseRoomList } from './guards';

export const getRoomListApi = async () => {
  const response = await api('/api/rooms.json');
  const data = parseRoomList(response.data);
  return data;
};
