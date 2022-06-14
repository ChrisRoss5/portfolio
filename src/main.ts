import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.config.globalProperties.$isBelow1366px = window.matchMedia(
  "(max-width: 1366px)"
).matches;

app.use(router).mount("#app");

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $isBelow1366px: boolean;
  }
}

export {};
