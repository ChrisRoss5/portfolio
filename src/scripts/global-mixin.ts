import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    pathEnding(): string {
      return this.$route.path.split("/").pop()!;
    },
    areProjects(): boolean {
      return this.$route.path.includes("/projects");
    },
    isBrowserApp(): boolean {
      return /extensions|themes/.test(this.pathEnding);
    },
  },
});
