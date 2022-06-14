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
        <svg
          v-if="sortedColumn.name == column.name"
          viewBox="0 0 451.847 451.847"
          :style="{
            transform: `scale(${sortedColumn.descending ? -1 : 1})`,
          }"
          preserveAspectRatio="none"
        >
          <path
            d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
          />
        </svg>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Column } from "../scripts/apps";
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
  background: $dark4;
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

/* transitions */

.sort-icon-enter-from,
.sort-icon-leave-to {
  width: 0 !important;
  opacity: 0 !important;
  margin: 0 !important;
}
</style>
