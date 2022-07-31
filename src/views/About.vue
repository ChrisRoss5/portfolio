<template>
  <div id="about" :class="{ 'slide-enter-from-left': enterFromLeft }">
    <router-view v-slot="{ Component }">
      <Transition name="slide">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { aboutMeColumns } from "@/components/Columns.vue";

export default defineComponent({
  name: "AboutVue",
  data() {
    return { enterFromLeft: false };
  },
  pathEnding(newVal: string, prevVal: string) {
    if (this.areProjects) this.enterFromLeft = true;
    else {
      const keys = Object.keys(aboutMeColumns);
      this.enterFromLeft = keys.indexOf(newVal) < keys.indexOf(prevVal);
    }
  },
});
</script>

<style lang="scss">
#about > div {
  display: flex;
  gap: 2rem;
  line-height: 1.5rem;
  padding: 0 5vw;
  overflow: hidden auto;
  & > div:not(.about-title) {
    padding: 2% 2% 0 0;
    flex: 1 1 0;
    overflow: auto;
  }
  a {
    color: var(--special-b);
    &::after {
      content: "⧉";
      margin: 0 3px 0 5px;
    }
  }
}
.about-title {
  display: none !important;
  flex-basis: calc(1rem + 40px);
  background: var(--e);
  width: 200%;
  transform: translateX(-25%);
}
</style>
