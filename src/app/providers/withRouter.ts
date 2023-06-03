import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';
import { routes } from '@/pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

function hasQueryParams(route: RouteLocationNormalized) {
  return !!Object.keys(route.query).length;
}

router.beforeEach((to, from, next) => {
  if (!hasQueryParams(to) && hasQueryParams(from)) {
    next({
      name: to.name!,
      query: from.query
    });
  } else {
    next();
  }
});

export default router;
