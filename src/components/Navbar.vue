<template>
  <div id="navbar">
    <router-link v-for="(value, key) in routerLinks" :key="key" :to="key">
      {{ value.split(" ")[0] }}
      <br v-if="$mediaWidth.isBelow768px" />
      {{ value.split(" ")[1] }}
      <Transition name="line">
        <div v-show="path == key"></div>
      </Transition>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarVue",
  props: { path: String },
  data() {
    return {
      routerLinks: {
        extensions: "Browser Extensions",
        themes: "Browser Themes",
        web: "Web Apps",
        desktop: "Desktop Apps",
      },
    };
  },
});
</script>

<style lang="scss">
#navbar {
  display: flex;
  a {
    position: relative;
    flex: 1;
    text-align: center;
    padding: 20px 10px;
    &.router-link-active {
      color: var(--f);
      background: linear-gradient(to top, var(--e), var(--c));
    }
    div {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 5px;
      background: linear-gradient(to right, #fc28a8, #03edf9) !important;
      transition: height 150ms, opacity 150ms;
    }
  }
}

/* transitions */

.line-enter-from,
.line-leave-to {
  height: 0 !important;
  opacity: 0 !important;
}
</style>
