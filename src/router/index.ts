import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const component = {};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/projects",
    component,
    children: [
      { path: "extensions", component },
      { path: "themes", component },
      { path: "web", component },
      { path: "desktop", component },
      { path: ":pathMatch(.*)*", redirect: "/projects/extensions" },
    ],
  },
  {
    path: "/about",
    component,
    children: [
      { path: "experience", component },
      { path: "accomplishments", component },
      { path: "documents", component },
      { path: ":pathMatch(.*)*", redirect: "/about/experience" },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/projects/extensions",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
