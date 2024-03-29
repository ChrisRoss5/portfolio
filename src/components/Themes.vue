<template>
  <div id="themes">
    <div v-if="$mediaWidth.isBelow768px" class="active">
      {{ currentTheme }}
    </div>
    <div
      v-else
      v-for="theme in themes"
      :key="theme"
      @click="changeTheme(theme)"
      :class="{ active: theme == currentTheme, hover: true }"
    >
      {{ theme }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const themes = ["Light", "Dark", "Monokai", "Synthwave"] as const;
type Theme = typeof themes[number];

export default defineComponent({
  name: "ThemesVue",
  data() {
    return { themes, currentTheme: "" as unknown as Theme };
  },
  created() {
    this.currentTheme = ((localStorage.getItem("theme") as unknown) ||
      (this.$prefersDarkTheme ? "Synthwave" : "Light")) as Theme;
    this.changeTheme(this.currentTheme);
  },
  mounted() {
    let x0: number, y0: number;
    let isMultitouch = false;
    document.addEventListener(
      "touchstart",
      (e) => {
        isMultitouch = e.touches.length > 1;
        x0 = e.changedTouches[0].screenX;
        y0 = e.changedTouches[0].screenY;
      },
      { passive: true }
    );
    document.addEventListener(
      "touchend",
      (e) => {
        if (e.touches.length || window.visualViewport?.scale != 1) return;
        if (isMultitouch) return (isMultitouch = false);
        const x1 = e.changedTouches[0].screenX;
        const y1 = e.changedTouches[0].screenY;
        const deg = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
        const isHoriz = (-45 < deg && deg < 45) || -135 > deg || deg > 135;
        if (isHoriz && Math.abs(x1 - x0) > 40) this.swipeTheme(x1 > x0);
      },
      { passive: true }
    );
  },
  methods: {
    changeTheme(theme: Theme) {
      this.currentTheme = theme;
      document.body.className = theme.toLowerCase();
      localStorage.setItem("theme", theme);
      if (this.$mediaWidth.isBelow768px && this.$el) {
        this.$el.style.opacity = "1";
        this.$el.style.animation = "none";
        this.$el.offsetWidth; // nosonar
        this.$el.style.animation = "reveal 150ms 1s reverse forwards";
      }
    },
    swipeTheme(right: boolean) {
      const idx = this.themes.indexOf(this.currentTheme);
      if (idx == this.themes.length - 1 && !right)
        this.changeTheme(this.themes[0]);
      else if (idx == 0 && right)
        this.changeTheme(this.themes[this.themes.length - 1]);
      else this.changeTheme(this.themes[idx + (right ? -1 : 1)]);
    },
  },
});
</script>

<style lang="scss">
#themes {
  @include abs-cover(absolute, 0, null, null, 5vw);
  display: flex;
  font-size: 0.75rem;
  gap: 1rem;
  padding: 1rem 0;
  z-index: 999;
  & > div {
    flex: 1;
    cursor: pointer;
    transition: color 150ms, text-shadow 150ms;
    &.active {
      color: var(--f);
      text-shadow: 0 0 10px var(--a);
    }
  }
}
</style>
