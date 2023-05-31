import { type RoomList, RoomListSchema } from './types';

export function parseRoomList(payload: unknown): RoomList {
  const parsedPayload = RoomListSchema.parse(payload);
  return parsedPayload;
}
