<template>
  <div id="themes">
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

    let touchstartX = 0;
    document.addEventListener("touchstart", (e) => {
      touchstartX = e.changedTouches[0].screenX;
    });
    document.addEventListener("touchend", (e) => {
      const touchendX = e.changedTouches[0].screenX;
      if (Math.abs(touchendX - touchstartX) > 60)
        this.swipeTheme(touchendX > touchstartX);
    });
  },
  methods: {
    changeTheme(theme: Theme) {
      this.currentTheme = theme;
      document.body.className = theme.toLowerCase();
      localStorage.setItem('theme', theme);
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
      text-shadow: 0 0 5px $white;
    }
  }
}
</style>
