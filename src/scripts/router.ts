import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Projects from "@/views/Projects.vue";
import AboutVue from "@/views/About.vue";
import ExperienceVue from "@/views/about-me/Experience.vue";
import AccomplishmentsVue from "@/views/about-me/Accomplishments.vue";
import EducationVue from "@/views/about-me/Education.vue";
import DocumentsVue from "@/views/about-me/Documents.vue";

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
      { path: "education", component: EducationVue },
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
export const sitemap = {
  projects: {
    extensions: { long: "Browser Extensions" },
    themes: { long: "Browser Themes" },
    web: { long: "Web Apps" },
    desktop: { long: "Desktop Apps" },
  },
  about: {
    experience: {
      long: "Experience",
      titles: ["General Experience", "Work Experience"],
    },
    education: {
      long: "Education",
      titles: ["High School", "University"],
    },
    accomplishments: {
      long: "Accomplishments",
      short: "Accompl.",
      titles: ["Awards", "Certificates", "Articles"],
    },
    documents: {
      long: "Documents",
      short: "Docs",
      titles: [
        "CVs",
        "Competitions",
        "Certificates",
        "Education",
        "References",
      ],
    },
  },
};
