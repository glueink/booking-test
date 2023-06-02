import { defineStore } from 'pinia';
import { usePropertyStore } from '@/entities/Property';
import { useRoomStore } from '@/entities/Room';

export const usePropertyRoomStore = defineStore('propertyRoom', () => {
  const propertyStore = usePropertyStore();
  const roomStore = useRoomStore();

  async function initPropertyRooms() {
    await Promise.all([propertyStore.getPropertyItem(), roomStore.getRoomList()]);
    console.log(roomStore.roomList);
    console.log(propertyStore.propertyItem);
  }

  return { initPropertyRooms };
});
