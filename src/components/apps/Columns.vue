<template>
  <div id="columns">
    <div
      v-for="column in columns"
      :key="column.name"
      v-show="!column.browserAppSpecific || isBrowserApp"
      :class="{ sortable: !column.unsortable }"
      @click="!column.unsortable && $emit('sort', column.name)"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Column } from "@/scripts/apps";
import { SortedColumn } from "./Apps.vue";

export default defineComponent({
  name: "ColumnsVue",
  props: {
    columns: {
      type: Object as PropType<Column[]>,
      required: true,
    },
    sortedColumn: {
      type: Object as PropType<SortedColumn>,
      required: true,
    },
    isBrowserApp: Boolean,
  },
  emits: ["sort"],
  methods: {
    formatTitle(text: string) {
      const result = text.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
  },
});
</script>

<style lang="scss">
#columns {
  text-align: center;
  background: var(--e);
  user-select: none;
  white-space: nowrap;
  height: calc(1rem + 40px);
  & > div {
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
