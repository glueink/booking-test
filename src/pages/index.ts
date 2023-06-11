import { type RouteRecordRaw } from 'vue-router';

import { useCheckoutStore } from '@/features/Checkout';

import MainPage from './ui/MainPage.vue';
import RoomDetailsPage from './ui/RoomDetailsPage.vue';
import SuccessPage from './ui/SuccessPage.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/room/:roomId',
    name: 'roomDetails',
    component: RoomDetailsPage
  },
  {
    path: '/success',
    name: 'success',
    component: SuccessPage,
    beforeEnter(to, from) {
      const checkoutStore = useCheckoutStore();
      if (!checkoutStore.isAvailable) {
        return from;
      }
    }
  }
];

export { routes };
