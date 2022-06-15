<template>
  <ThemesVue></ThemesVue>
  <MenuIcon
    v-if="$mediaWidth.isBelow1366px"
    :class="{ open: mobileMenuOpen }"
    @open="mobileMenuOpen = !mobileMenuOpen"
  ></MenuIcon>
  <div id="intro">
    <div id="title">
      <span style="font-size: 4rem">Hi</span>, I'm Kristijan Rosandić, Software
      Engineer.
    </div>
    <LinksVue></LinksVue>
    <LogoSVG :class="{ completed: animationCompleted }"></LogoSVG>
  </div>
  <AppsVue></AppsVue>
  <Transition name="mobile-about">
    <AboutVue
      v-show="mobileMenuOpen || !$mediaWidth.isBelow1366px"
      @completed="animationCompleted = true"
    ></AboutVue>
  </Transition>
  <div id="themes-note" v-if="$mediaWidth.isBelow768px">
    Swipe left/right to change themes!
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThemesVue from "./components/Themes.vue";
import MenuIcon from "./components/MenuIcon.vue";
import LinksVue from "./components/Links.vue";
import AppsVue from "./components/Apps.vue";
import AboutVue from "./components/About.vue";
import LogoSVG from "./components/LogoSVG.vue";

export default defineComponent({
  components: {
    ThemesVue,
    MenuIcon,
    LinksVue,
    AppsVue,
    AboutVue,
    LogoSVG,
  },
  data() {
    return {
      mobileMenuOpen: false,
      animationCompleted: false,
    };
  },
  watch: {
    mobileMenuOpen(newVal) {
      window.scrollTo(0, 0);
      document.body.style.overflow = newVal ? "hidden" : "auto";
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
#intro {
  position: relative;
  padding: 8vh 5vw 0;
  overflow: hidden;
  z-index: 0;
}
#title {
  font-size: 1.2rem;
  letter-spacing: 0.25rem;
}
#themes-note {
  text-align: center;
  color: var(--a-05);
  padding: 1rem;
}

/* transitions */

.mobile-about-leave-to,
.mobile-about-enter-from {
  background: none !important;
  backdrop-filter: none !important;
}
.mobile-about-leave-to {
  opacity: 0;
}
</style>
