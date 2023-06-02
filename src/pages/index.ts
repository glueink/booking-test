import { type RouteRecordRaw } from 'vue-router';

import MainPage from './components/MainPage.vue';
import ProductsPage from './components/ProductsPage.vue';
import BookingsPage from './components/BookingsPage.vue';
import PropertyPage from './components/PropertyPage.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: BookingsPage
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsPage
  },
  {
    path: '/property',
    name: 'property',
    component: PropertyPage
  }
];

export { routes };
