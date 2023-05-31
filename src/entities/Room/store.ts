import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getRoomListApi } from './api';
import type { RoomList } from './types';

export const useRoomStore = defineStore('room', () => {
  const roomList = ref<RoomList>([]);

  async function getRoomList() {
    const room = await getRoomListApi();
    roomList.value = room;
  }

  return { getRoomList, roomList };
});
