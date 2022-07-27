<template>
  <div id="links">
    <div>
      <a href="https://www.google.com/search?q=Croatia, Zagreb" target="_blank">
        <component :is="'LocationSVG'" style="margin-right: 0" />
        Croatia, Zagreb
      </a>
      <a href="mailto:kristijan.ros@gmail.com">
        <component :is="'MailSVG'" />
        &nbsp; kristijan.ros@gmail.com
      </a>
    </div>
    <div id="socials">
      <a
        v-for="(value, key) in socials"
        :key="key"
        :href="value"
        target="_blank"
      >
        <component :is="key + 'SVG'" />
      </a>
    </div>
    <div id="section-choice">
      <router-link
        to="/projects"
        :class="{ 'router-link-active': $route.path.startsWith('/projects') }"
      >
        My Projects
      </router-link>
      <router-link
        to="/about"
        :class="{ 'router-link-active': $route.path.startsWith('/about') }"
        style="margin-left: 10px"
        >About Me
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LinksVue",
  data() {
    return {
      socials: {
        Github: "https://github.com/ChrisRoss5",
        Facebook: "https://www.facebook.com/kristijan.rosandic.9/",
        Linkedin:
          "https://www.linkedin.com/in/kristijan-rosandi%C4%87-a32589172/",
        Twitter: "https://twitter.com/RosRosandic",
        Youtube: "https://www.youtube.com/channel/UCiYn99aPlfjXYmulJaWju_A",
      },
    };
  },
});
</script>

<style lang="scss">
#links {
  display: flex;
  align-items: center;
  & > div {
    display: flex;
    &:not(#section-choice) {
      gap: 30px;
    }
  }
  a:hover {
    color: var(--f);
    svg,
    svg path {
      fill: var(--f);
    }
  }
}
#socials {
  gap: 10px !important;
  margin: 0 30px;
  padding: 0 30px;
  border-right: 1px solid var(--a-05);
  border-left: 1px solid var(--a-05);
}
#section-choice a {
  position: relative;
  padding: 5px 10px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    transform: scaleX(0);
    transition: transform 150ms;
    z-index: -1;
  }
  &:before {
    top: -3px;
    bottom: -3px;
    left: -3px;
    right: -3px;
    border-radius: 6px;
    background: linear-gradient(to right, var(--special-a), var(--special-b));
  }
  &::after {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 4px;
    background: var(--d);
  }
  &.router-link-active {
    color: var(--f);
    &::before,
    &::after {
      transform: scale(1);
    }
  }
}
</style>
