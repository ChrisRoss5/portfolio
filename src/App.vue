<template>
  <ThemesVue />
  <MenuIcon
    v-if="$mediaWidth.isBelow1366px"
    :class="{ open: mobileMenuOpen }"
    @open="mobileMenuOpen = !mobileMenuOpen"
  />
  <IntroVue :completed="animationCompleted" />
  <Transition name="mobile-sidebar">
    <SidebarVue
      v-show="mobileMenuOpen || !$mediaWidth.isBelow1366px"
      @completed="animationCompleted = true"
    />
  </Transition>
  <AppsVue />
  <div id="themes-note" v-if="$mediaWidth.isBelow768px">
    Swipe left/right to change themes!
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThemesVue from "./components/Themes.vue";
import MenuIcon from "./components/MenuIcon.vue";
import IntroVue from "./components/Intro.vue";
import SidebarVue from "./components/Sidebar.vue";
import AppsVue from "./components/apps/Apps.vue";

export default defineComponent({
  components: { ThemesVue, MenuIcon, IntroVue, SidebarVue, AppsVue },
  data() {
    return {
      mobileMenuOpen: false,
      animationCompleted: false,
    };
  },
  watch: {
    mobileMenuOpen(newVal) {
      if (this.$mediaWidth.isBelow768px) {
        window.scrollTo(0, 0);
        document.body.style.overflow = newVal ? "hidden" : "auto";
      }
    },
  },
});
</script>

<style lang="scss">
#app {
  display: grid;
  height: 100vh;
  overflow: hidden;
  grid-template:
    "a b"
    "c b" 1fr / 1fr;
  background: var(--c);
}
#themes-note {
  text-align: center;
  color: var(--a-05);
  padding: 2rem;
}
.mobile-sidebar-leave-to,
.mobile-sidebar-enter-from {
  background: none !important;
  backdrop-filter: none !important;
}
.mobile-sidebar-leave-to {
  opacity: 0;
}
</style>
