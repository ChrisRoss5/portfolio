<template>
  <div v-if="!$mediaWidth.isBelow768px" id="themes">
    <div
      v-for="theme in themes"
      :key="theme"
      @click="changeTheme(theme)"
      :class="{ active: theme == currentTheme }"
    >
      {{ theme }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const themes = ["Dark", "Light", "Monokai", "Synthwave"] as const;
type Theme = typeof themes[number];

export default defineComponent({
  name: "ThemesVue",
  data() {
    return { themes, currentTheme: "" as unknown as Theme };
  },
  created() {
    this.currentTheme = ((localStorage.getItem("theme") as unknown) ||
      (this.$prefersDarkTheme ? "Dark" : "Light")) as Theme;
    this.changeTheme(this.currentTheme);
  },
  mounted() {
    let x0: number, y0: number;
    document.addEventListener("touchstart", (e) => {
      x0 = e.changedTouches[0].screenX;
      y0 = e.changedTouches[0].screenY;
    });
    document.addEventListener("touchend", (e) => {
      const x1 = e.changedTouches[0].screenX;
      const y1 = e.changedTouches[0].screenY;
      const deg = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
      const isHoriz = (-45 < deg && deg < 45) || -135 > deg || deg > 135;
      if (isHoriz && Math.abs(x1 - x0) > 40) this.swipeTheme(x1 > x0);
    });
  },
  methods: {
    changeTheme(theme: Theme) {
      this.currentTheme = theme;
      document.body.className = theme.toLowerCase();
      localStorage.setItem("theme", theme);
    },
    swipeTheme(right: boolean) {
      const idx = this.themes.indexOf(this.currentTheme);
      if (idx == this.themes.length - 1 && right)
        this.changeTheme(this.themes[0]);
      else if (idx == 0 && !right)
        this.changeTheme(this.themes[this.themes.length - 1]);
      else this.changeTheme(this.themes[idx + (right ? 1 : -1)]);
    },
  },
});
</script>

<style lang="scss">
#themes {
  position: absolute;
  top: 0;
  left: 5vw;
  display: flex;
  font-size: 0.75rem;
  gap: 1rem;
  padding: 1rem 0;
  z-index: 1;
  & > div {
    flex: 1;
    cursor: pointer;
    transition: text-shadow 150ms;
    &.active {
      text-shadow: 0 0 5px var(--a);
    }
  }
}
</style>
