<template>
  <div id="navbar">
    <router-link v-for="(value, key) in routerLinks" :key="key" :to="key">
      {{ value.split(" ")[0] }}
      <br v-if="$mediaWidth.isBelow768px" />
      {{ value.split(" ")[1] }}
      <div
        :style="{ transform: `translateX(${transformX * 100}%)` }"
        :class="{ 'transform-transition': transformTransition }"
      ></div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarVue",
  props: { path: { type: String, required: true } },
  data() {
    return {
      routerLinks: {
        extensions: "Browser Extensions",
        themes: "Browser Themes",
        web: "Web Apps",
        desktop: "Desktop Apps",
      },
      transformX: 0,
      transformTransition: false,
    };
  },
  mounted() {
    const keys = Object.keys(this.routerLinks);
    const appsEl = this.$parent!.$el as HTMLElement;
    let x0: number, y0: number, cancelled: boolean;
    let isMultitouch = false;
    appsEl.addEventListener(
      "touchstart",
      (e) => {
        e.stopPropagation();
        isMultitouch = e.touches.length > 1;
        x0 = e.changedTouches[0].screenX;
        y0 = e.changedTouches[0].screenY;
        cancelled = false;
      },
      { passive: true }
    );
    appsEl.addEventListener(
      "touchmove",
      (e) => {
        if (cancelled || isMultitouch || window.visualViewport.scale != 1)
          return (this.transformX = 0);
        const x1 = e.changedTouches[0].screenX;
        const y1 = e.changedTouches[0].screenY;
        const deg = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
        const isHoriz = (-30 < deg && deg < 30) || -150 > deg || deg > 150;
        if (!isHoriz) return (cancelled = !(this.transformX = 0));
        const { width } = window.visualViewport;
        const perc = ((x0 - x1) / width) * keys.length;
        const left = this.path == keys[0] ? 0 : -1;
        const right = this.path == keys[keys.length - 1] ? 0 : 1;
        this.transformX = Math.max(left, Math.min(right, perc));
      },
      { passive: true }
    );
    appsEl.addEventListener(
      "touchend",
      (e) => {
        e.stopPropagation();
        if (e.touches.length || window.visualViewport.scale != 1) return;
        if (isMultitouch) return (isMultitouch = false);
        if (!this.transformX) return;
        if (Math.abs(this.transformX) < 0.5) return (this.transformX = 0);
        const isRight = this.transformX > 0;
        this.$router.push(keys[keys.indexOf(this.path) + (isRight ? 1 : -1)]);
        this.transformTransition = true;
        this.transformX += isRight ? -1 : 1;
        setTimeout(() => {
          this.transformX = 0;
          this.transformTransition = false;
        }, 0);
      },
      { passive: true }
    );
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
    div {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 0;
      background: linear-gradient(to right, var(--special-a), var(--special-b));
      &:not(.transform-transition) {
        transition: height 150ms;
      }
    }
    &.router-link-active {
      color: var(--f);
      background: linear-gradient(to top, var(--e), var(--c));
      div {
        height: 5px;
        transition: transform 100ms, height 150ms;
        &.transform-transition {
          transition: transform 100ms;
        }
      }
    }
  }
}
</style>
