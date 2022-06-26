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
  <div id="content">
    <NavbarVue />
    <ColumnsVue v-model:sortedColumn="sortedColumn" />
    <router-view :sortedColumn="sortedColumn" />
  </div>
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
import NavbarVue from "./components/Navbar.vue";
import ColumnsVue from "./components/Columns.vue";

const sortedColumn = {
  name: "weeklyUsers",
  descending: false,
  isInitial: false,
};
export type SortedColumn = typeof sortedColumn;

export default defineComponent({
  components: {
    ThemesVue,
    MenuIcon,
    IntroVue,
    SidebarVue,
    NavbarVue,
    ColumnsVue,
  },
  data() {
    return {
      mobileMenuOpen: false,
      animationCompleted: false,
      sortedColumn,
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
#content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--d);
  & > div {
    padding: 0 5vw;
  }
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
