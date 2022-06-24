<template>
  <div id="intro">
    <component :is="'LogoSVG'" id="logo" :class="{ completed }" />
    <div id="title">
      <span id="hi" style="font-size: 4rem">Hi</span>{{ sentence }}
      <span id="caret"></span>
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
    return {
      sentence: "",
    };
  },
  mounted() {
    let i = 0;
    const sentence = ", I'm Kristijan Rosandić, Software Engineer.";
    const interval = setInterval(() => {
      if (sentence[i]) this.sentence += sentence[i++];
      else clearInterval(interval);
    }, 25);
  },
  watch: {
    $route() {
      console.log(this.$route);
    },
  },
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
  letter-spacing: 0.2rem;
}
#caret {
  width: 0.3rem;
  height: 1rem;
  display: inline-block;
  transform: scaleY(2) translateX(-0.5rem);
  background: var(--a);
  box-shadow: 0 0 8px 0 var(--a);
  animation: reveal 150ms 1100ms 8 alternate forwards;
}
</style>
