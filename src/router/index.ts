import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/extensions", component: {} },
  { path: "/themes", component: {} },
  { path: "/web", component: {} },
  { path: "/desktop", component: {} },
  { path: "/:pathMatch(.*)*", redirect: "/extensions" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
