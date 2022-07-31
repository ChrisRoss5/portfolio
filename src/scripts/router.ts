import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Projects from "@/views/Projects.vue";
import AboutVue from "@/views/About.vue";
import ExperienceVue from "@/components/about-me/Experience.vue";
import AccomplishmentsVue from "@/components/about-me/Accomplishments.vue";
import DocumentsVue from "@/components/about-me/Documents.vue";

const component = {};
const routes: Array<RouteRecordRaw> = [
  {
    path: "/projects",
    component: Projects,
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
    component: AboutVue,
    children: [
      { path: "experience", component: ExperienceVue },
      { path: "accomplishments", component: AccomplishmentsVue },
      { path: "documents", component: DocumentsVue },
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
