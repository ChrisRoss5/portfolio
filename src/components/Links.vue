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
      <a href="https://github.com/ChrisRoss5" target="_blank">
        <component :is="'GithubSVG'" />
      </a>
      <a href="https://www.facebook.com/kristijan.rosandic.9/" target="_blank">
        <component :is="'FacebookSVG'" />
      </a>
      <a
        href="https://www.linkedin.com/in/kristijan-rosandi%C4%87-a32589172/"
        target="_blank"
      >
        <component :is="'LinkedinSVG'" />
      </a>
      <a href="https://twitter.com/RosRosandic" target="_blank">
        <component :is="'TwitterSVG'" />
      </a>
      <a
        href="https://www.youtube.com/channel/UCiYn99aPlfjXYmulJaWju_A"
        target="_blank"
      >
        <component :is="'YoutubeSVG'" />
      </a>
    </div>
    <CVsVue></CVsVue>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CVsVue from "./reusable/CVs.vue";
export default defineComponent({ name: "LinksVue", components: { CVsVue } });
</script>

<style lang="scss">
#links {
  display: flex;
  padding: 2% 0;
  & > div {
    display: flex;
    gap: 30px;
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
</style>
