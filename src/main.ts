import { createApp, reactive, ref } from "vue";
import App from "./App.vue";
import router from "./router";

const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
const isBelow1366px = window.matchMedia("(max-width: 1366px)");
const isBelow768px = window.matchMedia("(max-width: 768px)");
const app = createApp(App);
app.config.globalProperties.$prefersDarkTheme = prefersDarkTheme.matches;
app.config.globalProperties.$mediaWidth = reactive(ref());
app.config.globalProperties.$mediaWidth.isBelow1366px = isBelow1366px.matches;
app.config.globalProperties.$mediaWidth.isBelow768px = isBelow768px.matches;
isBelow1366px.addEventListener("change", (e) => {
  app.config.globalProperties.$mediaWidth.isBelow1366px = e.matches;
});
isBelow768px.addEventListener("change", (e) => {
  app.config.globalProperties.$mediaWidth.isBelow768px = e.matches;
});
app.use(router).mount("#app");

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $prefersDarkTheme: boolean;
    $mediaWidth: {
      isBelow1366px: boolean;
      isBelow768px: boolean;
    };
  }
}

export {};
