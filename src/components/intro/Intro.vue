<template>
  <div id="intro">
    <component :is="'LogoSVG'" id="logo" :class="{ completed }" />
    <div id="title">
      <!-- <span id="hi" style="font-size: 4rem">Hi</span> -->
      <span id="typewriter" ref="typewriter">
        <div v-for="(word, i) in sentence.split(' ')" :key="i">
          <span v-for="(letter, j) in Array.from(word)" :key="j">
            {{ letter }}
          </span>
          <span>&nbsp;</span>
        </div>
      </span>
      <span id="last-updated" v-show="showLastUpdated">
        Updated: {{ new Date("2025-03-26").toLocaleDateString() }}</span
      >
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
      sentence: "Kristijan Rosandić — Software Engineer Portfolio",
      showLastUpdated: false,
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
        this.showLastUpdated = true;
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
  background: radial-gradient(
    ellipse at 70% 100%,
    var(--c) 0 60%,
    var(--special-a) 250%
  );
  & > *:not(:first-child) {
    margin-bottom: 2%;
  }
}
#logo {
  @include abs-cover(absolute, 0, 0, 0, null);
  height: 100%;
  width: auto;
  transform: scale(1.01);
  transition: filter 1s;
  will-change: filter;
  z-index: -1;
  &.completed {
    filter: drop-shadow(-2px -2px 4px var(--special-a))
      drop-shadow(2px 2px 4px var(--special-b));
  }
  path {
    fill: var(--d);
  }
}
#title {
  padding-right: 2rem;
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
  line-height: 2rem;
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
      top: 0;
      width: 0.3rem;
      height: 1rem;
      transform: scaleY(2) translate(-0.4rem, 0);
      background: var(--a);
      box-shadow: 0 0 8px 0 var(--a);
    }
    &[last]::after {
      animation: reveal 150ms 8 alternate forwards;
    }
  }
}
#last-updated {
  display: inline-block;
  font-size: 0.6rem;
  letter-spacing: 0.05rem;
  line-height: 0;
  color: var(--special-a);
  text-wrap: nowrap;
  opacity: 0;
  margin-left: 0.2rem;
  transform: translateX(-1rem);
  animation: reveal-last-updated 250ms forwards;
}
@keyframes reveal-last-updated {
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
