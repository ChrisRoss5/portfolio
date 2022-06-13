import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.config.globalProperties.$isMobile =
  window.matchMedia("(max-width: 1280px)").matches;

app.use(router).mount("#app");


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $isMobile: boolean;
  }
}

export {}