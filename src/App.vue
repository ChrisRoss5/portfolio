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
  <div
    id="dynamic-content"
    :class="{
      'are-projects': $areProjects,
      'slide-enter-from-left': slideFromLeft,
    }"
  >
    <NavbarVue />
    <ColumnsVue
      v-show="!$mediaWidth.isBelow768px || $areProjects"
      v-model:sortedColumn="sortedColumn"
    />
    <router-view v-slot="{ Component }">
      <Transition name="slide">
        <component
          :is="Component"
          id="content"
          :sortedColumn="$areProjects ? sortedColumn : null"
        />
      </Transition>
    </router-view>
  </div>
  <div id="themes-note" v-if="$mediaWidth.isBelow768px">
    Swipe to change themes, sections, or projects!
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThemesVue from "./components/Themes.vue";
import MenuIcon from "./components/MenuIcon.vue";
import IntroVue from "./components/intro/Intro.vue";
import SidebarVue from "./components/Sidebar.vue";
import NavbarVue from "./components/Navbar.vue";
import ColumnsVue from "./components/Columns.vue";
import { sitemap } from "@/scripts/router";

const aboutMeKeys = Object.keys(sitemap.about);
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
      slideFromLeft: false,
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
    $pathEnding(newVal: string, prevVal: string) {
      this.slideFromLeft =
        this.$areProjects ||
        aboutMeKeys.indexOf(newVal) < aboutMeKeys.indexOf(prevVal);
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
  background: var(--d);
}
#dynamic-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: radial-gradient(
    ellipse at 30% 0,
    var(--d) 0 60%,
    var(--special-b) 250%
  );
  & > div:not(#about) {
    padding: 0 5vw;
  }
}
#content {
  overflow: auto;
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
