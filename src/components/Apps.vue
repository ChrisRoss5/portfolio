<template>
  <div id="apps">
    <NavbarVue :path="path"></NavbarVue>
    <div id="columns">
      <div
        v-for="column in columns"
        :key="column.name"
        v-show="!column.browserAppSpecific || isBrowserApp"
        :class="{ sortable: !column.unsortable }"
        @click="!column.unsortable && sort(column.name)"
      >
        {{ formatTitle(column.name) }}
        <Transition name="sort-icon">
          <svg
            v-if="sortedColumn.name == column.name"
            viewBox="0 0 451.847 451.847"
            :style="{
              transform: `scale(${sortedColumn.descending ? 1 : -1})`,
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
    <div id="table">
      <TransitionGroup name="table" :key="path">
        <div v-for="app in currentApps" :key="app.name">
          <div
            v-for="column in columns"
            :key="column.name"
            v-show="!column.browserAppSpecific || isBrowserApp"
          >
            <template v-if="column.name == 'name'">
              <img :src="getAppImg(app.img)" />
              {{ app[column.name] }}
            </template>
            <a
              v-else-if="column.name == 'links'"
              v-for="(value, key) in app[column.name]"
              :key="key"
              :href="value"
              target="_blank"
            >
              <img :src="require(`@/assets/icons/${key}.svg`)" class="icon" />
            </a>
            <img
              v-else-if="column.name == 'tech'"
              v-for="tech in app[column.name]"
              :key="tech"
              class="icon"
              :src="require(`@/assets/icons/tech/${tech}.svg`)"
              :title="tech"
            />
            <template
              v-else-if="column.name == 'weeklyUsers' && app[column.name]"
            >
              {{ app[column.name] + (app[column.name]! % 100 == 0 ? "+" : "") }}
            </template>
            <template v-else-if="app[column.name]">
              {{
                ["created", "lastUpdated"].includes(column.name)
                  ? (app[column.name] as Date).toLocaleDateString('en-CA')
                  : app[column.name]
              }}
            </template>
            <LoadingSVGVue v-else></LoadingSVGVue>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { App, apps, columns } from "../scripts/apps";
import NavbarVue from "./Navbar.vue";
import LoadingSVGVue from "./LoadingSVG.vue";
const parser = new DOMParser();

export default defineComponent({
  name: "AppsVue",
  components: { NavbarVue, LoadingSVGVue },
  data() {
    return {
      columns,
      apps,
      sortedColumn: { name: "weeklyUsers", descending: true },
    };
  },
  mounted() {
    for (const key in this.apps)
      if (key == "extensions" || key == "themes")
        for (const app of this.apps[key]) this.getBrowserAppInfo(app);
  },
  methods: {
    formatTitle(text: string) {
      const result = text.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
    sort(columnName: keyof App) {
      const isSameColumn = columnName == this.sortedColumn.name;
      const descending = isSameColumn ? !this.sortedColumn.descending : true;
      this.sortedColumn = { name: columnName, descending };
      this.currentApps.sort((a, b) => {
        if (a[columnName]! < b[columnName]!) return descending ? -1 : 1;
        if (a[columnName]! > b[columnName]!) return descending ? 1 : -1;
        return 0;
      });
    },
    getAppImg(name: string) {
      return require(`@/assets/apps/${name.replace("/", "")}.webp`);
    },
    getBrowserAppInfo(app: App) {
      if (!app.links.chrome/*  || !0 */) return; // todo
      fetch("https://cors-anywhere.herokuapp.com/" + app.links.chrome)
        .then((response) => response.text())
        .then((html) => {
          console.log(html);
          const doc = parser.parseFromString(html, "text/html");
          const weeklyUsers = doc.querySelector(".e-f-ih")!
            .textContent as string;
          const updated = doc.querySelector(".h-C-b-p-D-xh-hh")!.textContent;
          app.weeklyUsers = parseInt(weeklyUsers.replace(/\D/g, ""));
          app.lastUpdated = new Date(updated as string);
        });
    },
  },
  computed: {
    path(): string {
      return this.$route.path.replaceAll("/", "");
    },
    isBrowserApp(): boolean {
      return this.path == "extensions" || this.path == "themes";
    },
    currentApps(): App[] {
      return (this.apps as any)[this.path] || this.apps.extensions;
    },
  },
});
</script>

<style lang="scss">
#apps {
  flex: 1;
  background: $dark3;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & > div {
    padding: 0 5vw;
  }
}
#columns,
#table > div {
  display: flex;
  & > div {
    flex: 1;
    &:first-of-type {
      flex: 1 0 20%;
    }
  }
}
#columns {
  background: $dark4;
  user-select: none;
  border-top: 10px solid $dark2;
  border-bottom: 10px solid $dark2;
  & > div {
    height: calc(1rem + 40px);
    @extend .flex-center;
    padding: 0 20px;
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
#table {
  overflow: auto;
  & > div {
    background: $dark3;
    border-bottom: 5px solid $dark4;
    & > div {
      transition: none !important;
      @extend .flex-center;
      padding: 20px;
      &:first-of-type {
        gap: 20px;
        justify-content: left;
      }
      a:not(:last-of-type),
      img:not(:last-of-type) {
        margin-right: 10px;
      }
    }
  }
  .icon {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
}
#app-icon {
  display: flex;
  align-items: center;
  text-align: left;
}

/* transitions */

.sort-icon-enter-from,
.sort-icon-leave-to {
  width: 0 !important;
  opacity: 0 !important;
  margin: 0 !important;
}

.table-move {
  transition: transform 150ms;
}
</style>
