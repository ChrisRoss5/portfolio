<template>
  <div id="intro">
    <component :is="'LogoSVG'" id="logo" :class="{ completed }" />
    <div id="title">
      <span style="font-size: 4rem">Hi</span>, I'm
      <span>Kristijan Rosandić, </span>
      <span>Software Engineer.</span>
    </div>
    <LinksVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinksVue from "./Links.vue";

export default defineComponent({
  name: "IntroVue",
  components: { LinksVue },
  props: { completed: Boolean },
    data() {
    return {};
  },
  mounted() {
    console.log(this.$route);
  },
  watch: {
    $route() {
      console.log(this.$route);
    }
  }
});
</script>

<style lang="scss">
#intro {
  position: relative;
  padding: 8vh 5vw 0;
  overflow: hidden;
  z-index: 0;
  & > *:not(:first-child) {
    margin-bottom: 2%;
  }
}
#logo {
  display: inline;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: auto;
  transform: scale(1.01);
  transition: filter 1s;
  will-change: filter;
  z-index: -1;
  &.completed {
    filter: drop-shadow(-3px -3px 6px var(--special-a))
      drop-shadow(3px 3px 6px var(--special-b));
  }
  path {
    fill: var(--d);
  }
}
#title {
  font-size: 1.2rem;
  letter-spacing: 0.25rem;
}
</style>
