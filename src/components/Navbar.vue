<template>
  <div id="navbar" :class="{ 'slide-enter-from-left': areProjects }">
    <TransitionGroup name="slide" appear>
      <router-link v-for="(value, key) in routerLinks" :key="key" :to="key">
        {{ value.split(" ")[0] }}
        <br v-if="$mediaWidth.isBelow768px" />
        {{ value.split(" ")[1] }}
        <div
          :style="{ transform: `translateX(${transformX * 100}%)` }"
          :class="{ 'transform-transition': transformTransition }"
        ></div>
      </router-link>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarVue",
  data() {
    return {
      transformX: 0,
      transformTransition: false,
    };
  },
  mounted() {
    const contentEl = this.$el.parentElement as HTMLElement;
    let x0: number, y0: number, cancelled: boolean, isMultitouch: boolean;
    contentEl.addEventListener(
      "touchstart",
      (e) => {
        e.stopPropagation();
        x0 = e.changedTouches[0].screenX;
        y0 = e.changedTouches[0].screenY;
        isMultitouch = e.touches.length > 1;
        cancelled = false;
      },
      { passive: true }
    );
    contentEl.addEventListener(
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
        const perc = ((x0 - x1) / width) * this.paths.length;
        const { 0: first, [this.paths.length - 1]: last } = this.paths;
        const left = this.pathEnding == first && this.areProjects ? 0 : -1;
        const right = this.pathEnding == last && !this.areProjects ? 0 : 1;
        this.transformX = Math.max(left, Math.min(right, perc));
      },
      { passive: true }
    );
    contentEl.addEventListener(
      "touchend",
      (e) => {
        e.stopPropagation();
        if (e.touches.length || window.visualViewport.scale != 1) return;
        if (isMultitouch) return (isMultitouch = false);
        if (!this.transformX) return;
        if (Math.abs(this.transformX) < 0.5) return (this.transformX = 0);
        const isRight = this.transformX > 0;
        const idx = this.paths.indexOf(this.pathEnding);
        const newPath = this.paths[idx + (isRight ? 1 : -1)];
        if (!newPath) {
          this.$router.push(
            this.areProjects ? "/about/experience" : "/projects/desktop"
          );
        } else {
          this.$router.push(newPath);
          this.transformTransition = true;
          this.transformX += isRight ? -1 : 1;
        }
        setTimeout(() => {
          this.transformX = 0;
          this.transformTransition = false;
        }, 0);
      },
      { passive: true }
    );
  },
  computed: {
    paths(): string[] {
      return Object.keys(this.routerLinks);
    },
    routerLinks(): Record<string, string> {
      return this.areProjects
        ? {
            extensions: "Browser Extensions",
            themes: "Browser Themes",
            web: "Web Apps",
            desktop: "Desktop Apps",
          }
        : {
            experience: "Experience",
            accomplishments: "Accomplishments",
            documents: "Documents",
          };
    },
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
    transition: opacity 250ms, transform 250ms;
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
