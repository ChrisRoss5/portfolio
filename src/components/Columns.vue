<template>
  <Transition name="columns" :css="$pdfViewerReady">
    <div id="columns" v-show="$pathEnding != 'documents' || !$pdfViewerReady">
      <TransitionGroup name="slide">
        <template v-if="$areProjects">
          <div
            v-for="(column, i) in projectsColumns"
            :key="i"
            v-show="!column.browserOnly || $isBrowserApp"
            :class="{ hover: !column.unsortable, first: i == 0 }"
            @click="!column.unsortable && sort(column.name)"
          >
            {{ formatTitle(column.name) }}
            <Transition name="sort-icon">
              <component
                :is="'ArrowDownSVG'"
                v-if="sortedColumn.name == column.name"
                :style="{
                  transform: `scale(${sortedColumn.descending ? 1 : -1})`,
                }"
              />
            </Transition>
          </div>
        </template>
        <template v-else-if="$pathEnding != 'documents' || !$pdfViewerReady">
          <div v-for="columnName in aboutMeColumns" :key="columnName">
            {{ columnName }}
          </div>
        </template>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<script lang="ts">
import { SortedColumn } from "@/App.vue";
import { Project, columns as projectsColumns } from "@/scripts/projects";
import { sitemap } from "@/scripts/router";
import { PropType, defineComponent } from "vue";

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
    sort(name: keyof Project, descending?: boolean, isInitial?: boolean) {
      const isSameColumn = name == this.sortedColumn.name;
      descending ||= isSameColumn ? !this.sortedColumn.descending : true;
      this.$emit("update:sortedColumn", { name, descending, isInitial });
    },
  },
  computed: {
    aboutMeColumns(): string[] {
      const path = this.$pathEnding as keyof typeof sitemap.about;
      return this.$areProjects || !path ? [] : sitemap.about[path].titles;
    },
  },
  watch: {
    $route() {
      if (!this.$areProjects) return;
      console.log(this.$isBrowserApp);
      if (this.$isBrowserApp) this.sort("weeklyUsers", true, true);
      else this.sort("created", true, true);
    },
  },
});
</script>

<style lang="scss">
#columns {
  flex-shrink: 0;
  display: flex;
  text-align: center;
  background: var(--e);
  user-select: none;
  white-space: nowrap;
  transition: opacity 1s;
  overflow: hidden;
  & > div {
    flex: 1;
    @extend .flex-center;
    padding: var(--cell-padding);
    transition: color 150ms, opacity 350ms, transform 350ms;
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
.columns-enter-from,
.columns-leave-to {
  opacity: 0 !important;
}
</style>
