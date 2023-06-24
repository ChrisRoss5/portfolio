<template>
  <div id="about" :class="{ [$pathEnding]: true }">
    <router-view v-slot="{ Component }">
      <Transition name="slide">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </Transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ name: "AboutVue" });
</script>

<style lang="scss">
#about {
  position: relative;
  flex: 1;
  & > div {
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
      @extend .new-tab-link
    }
  }
}
.about-title {
  display: none;
  align-items: center;
  justify-content: center;
  padding: var(--cell-padding);
  background: var(--e);
  width: 200%;
  transform: translateX(-25%);
}
.box {
  border-radius: 6px;
  background: var(--b);
  padding: 1rem;
  margin-bottom: 1rem;
}
.box-title {
  font-weight: bold;
}
.box-position {
  font-style: italic;
  &::before {
    content: " — ";
  }
}
.box-duration {
  color: var(--a-05);
  padding: 1rem 0;
}
</style>
