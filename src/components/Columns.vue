<template>
  <div id="columns">
    <template v-if="isProjects">
      <div
        v-for="column in projectsColumns"
        :key="column.name"
        v-show="!column.isBrowserApp || isBrowserApp"
        :class="{ sortable: !column.unsortable }"
        @click="!column.unsortable && sort(column.name)"
      >
        {{ formatTitle(column.name) }}
        <Transition name="sort-icon">
          <component
            :is="'ArrowDownSVG'"
            v-if="sortedColumn.name == column.name"
            :style="{ transform: `scale(${sortedColumn.descending ? -1 : 1})` }"
          />
        </Transition>
      </div>
    </template>
    <template v-else>
      <div v-for="columnName in aboutMeColumns" :key="columnName">
        {{ columnName }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Project, columns as projectsColumns } from "@/scripts/projects";
import { SortedColumn } from "@/App.vue";

const aboutMeColumns = {
  experience: ["Skills & Relevant Experience", "Work Experience"],
  accomplishments: ["Awards", "Certificates", "Articles"],
  documents: ["CVs"],
};

export default defineComponent({
  name: "ColumnsVue",
  props: {
    sortedColumn: {
      type: Object as PropType<SortedColumn>,
      required: true,
    },
  },
  emits: ["update:sortedColumn"],
  data() {
    return { projectsColumns };
  },
  methods: {
    formatTitle(text: string) {
      const result = text.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
    sort(name: keyof Project, descending?: boolean) {
      const isSameColumn = name == this.sortedColumn.name;
      const isInitial = descending == undefined;
      if (isInitial)
        descending = isSameColumn ? !this.sortedColumn.descending : false;
      this.$emit("update:sortedColumn", { name, descending, isInitial });
    },
  },
  computed: {
    path(): string {
      return this.$route.path.split("/").pop()!;
    },
    isProjects(): boolean {
      return this.$route.path.includes("/projects");
    },
    isBrowserApp(): boolean {
      return /extensions|themes/.test(this.$route.path);
    },
    aboutMeColumns(): any[] {
      if (this.isProjects) return [];
      return aboutMeColumns[this.path as keyof typeof aboutMeColumns];
    },
  },
  watch: {
    $route() {
      if (this.isProjects)
        this.sort(this.isBrowserApp ? "weeklyUsers" : "created", false);
    },
  },
});
</script>

<style lang="scss">
#columns {
  display: flex;
  text-align: center;
  background: var(--e);
  user-select: none;
  white-space: nowrap;
  height: calc(1rem + 40px);
  & > div {
    flex: 1;
    @extend .flex-center;
    &.sortable {
      cursor: pointer;
    }
  }
  svg {
    width: 18px;
    height: 18px;
    margin-left: 10px;
    transition: transform 150ms, opacity 150ms, width 150ms, margin 150ms;
  }
}
.sort-icon-enter-from,
.sort-icon-leave-to {
  width: 0 !important;
  opacity: 0 !important;
  margin: 0 !important;
}
</style>
