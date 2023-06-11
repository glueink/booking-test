import { type RouteRecordRaw } from 'vue-router';

import { useBookingStore } from '@/features/Booking';
import { PageRoutes } from '@/shared';

import MainPage from './ui/MainPage.vue';
import RoomDetailsPage from './ui/RoomDetailsPage.vue';
import SuccessPage from './ui/SuccessPage.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: PageRoutes.MAIN,
    component: MainPage
  },
  {
    path: '/room/:roomId',
    name: PageRoutes.ROOM_DETAILS,
    component: RoomDetailsPage
  },
  {
    path: '/success',
    name: PageRoutes.SUCCESS,
    component: SuccessPage,
    beforeEnter(to, from) {
      const bookingStore = useBookingStore();
      if (!bookingStore.isCheckoutAvailable) {
        return from;
      }
    }
  }
];

export { routes };
