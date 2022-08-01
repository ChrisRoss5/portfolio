<template>
  <div id="intro">
    <component :is="'LogoSVG'" id="logo" :class="{ completed }" />
    <div id="title">
      <span id="hi" style="font-size: 4rem">Hi</span>
      <span id="typewriter" ref="typewriter">
        <div v-for="(word, i) in sentence.split(' ')" :key="i">
          <span v-for="(letter, j) in Array.from(word)" :key="j">
            {{ letter }}
          </span>
          <span>&nbsp;</span>
        </div>
      </span>
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
      sentence: ", I'm Kristijan Rosandić, Software Engineer. WIP.",
    };
  },
  mounted() {
    let i = 0;
    const typewriterEl = this.$refs.typewriter as HTMLElement;
    const letterEls = typewriterEl.querySelectorAll("span");
    const interval = setInterval(() => {
      if (letterEls[i]) {
        letterEls[i].className = "visible";
        letterEls[i].setAttribute("caret", "");
        if (i++) letterEls[i - 2].removeAttribute("caret");
      } else {
        letterEls[i - 1].setAttribute("last", "");
        clearInterval(interval);
      }
    }, 25);
  },
});
</script>

<style lang="scss">
#intro {
  position: relative;
  padding: 8vh 5vw 0;
  overflow: hidden;
  z-index: 0;
  transition: height 1s;
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
#typewriter > div {
  display: inline-block;
  & > span {
    position: relative;
    opacity: 0;
    &.visible {
      opacity: 1;
    }
    &[caret]::after {
      content: "";
      position: absolute;
      width: 0.3rem;
      height: 1rem;
      transform: scaleY(2) translateX(-0.5rem);
      background: var(--a);
      box-shadow: 0 0 8px 0 var(--a);
    }
    &[last]::after {
      animation: reveal 150ms 8 alternate forwards;
    }
  }
}
</style>
