import { type RouteRecordRaw } from 'vue-router';

import MainPage from './components/MainPage.vue';
import RoomDetailsPage from './components/RoomDetailsPage.vue';
import SuccessPage from './components/SuccessPage.vue';

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
    component: SuccessPage
  }
];

export { routes };
