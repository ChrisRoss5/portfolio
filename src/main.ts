import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./scripts/router";
import globalMixin from "./scripts/global-mixin";

const app = createApp(App);
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
const isBelow1366px = window.matchMedia("(max-width: 1366px)");
const isBelow768px = window.matchMedia("(max-width: 768px)");
app.config.globalProperties.$prefersDarkTheme = prefersDarkTheme.matches;
app.config.globalProperties.$mediaWidth = reactive({});
app.config.globalProperties.$mediaWidth.isBelow1366px = isBelow1366px.matches;
app.config.globalProperties.$mediaWidth.isBelow768px = isBelow768px.matches;
isBelow1366px.addEventListener("change", (e) => {
  app.config.globalProperties.$mediaWidth.isBelow1366px = e.matches;
});
isBelow768px.addEventListener("change", (e) => {
  app.config.globalProperties.$mediaWidth.isBelow768px = e.matches;
});

const ComponentContext = require.context("./assets/svg-vue", true, /\.vue$/i);
ComponentContext.keys().forEach((componentFilePath) => {
  const componentName = componentFilePath.split("/").pop()!.split(".")[0];
  app.component(componentName, ComponentContext(componentFilePath).default);
});
app.use(router).mixin(globalMixin).mount("#app");

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $prefersDarkTheme: boolean;
    $mediaWidth: {
      isBelow1366px: boolean;
      isBelow768px: boolean;
    };
    /* mixins */
    pathEnding: string;
    areProjects: boolean;
    isBrowserApp: boolean;
  }
}

export {};
