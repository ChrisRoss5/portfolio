<template>
  <div id="apps">
    <NavbarVue :path="path" />
    <ColumnsVue
      :columns="columns"
      :sortedColumn="sortedColumn"
      :isBrowserApp="isBrowserApp"
      @sort="sort($event)"
    />
    <div id="table">
      <TransitionGroup name="table" :key="path">
        <div v-for="app in currentApps" :key="app.name">
          <div class="app-name">
            <img
              :src="require(`@/assets/webp-app-logos/${app.img}.webp`)"
              :class="{ invert: app.img == 'My Developer Portfolio' }"
              alt="logo"
            />
            {{ app.name }}
            <component :is="'InfoSVG'" />
          </div>
          <div>{{ app.created.toLocaleDateString("en-CA") }}</div>
          <Transition name="reveal" mode="out-in">
            <div v-if="app.lastUpdated">
              {{ app.lastUpdated.toLocaleDateString("en-CA") }}
            </div>
            <div v-else-if="isBrowserApp"><component :is="'LoadingSVG'" /></div>
          </Transition>
          <Transition name="reveal" mode="out-in">
            <div v-if="app.weeklyUsers">{{ formatCount(app.weeklyUsers) }}</div>
            <div v-else-if="isBrowserApp"><component :is="'LoadingSVG'" /></div>
          </Transition>
          <div class="icons links">
            <a
              v-for="(value, key) in app.links"
              :key="key"
              :href="value"
              :class="{ invert: /(github|home|download)/.test(key) }"
              target="_blank"
            >
              <component :is="key + 'SVG'" unmodified />
            </a>
          </div>
          <div class="icons tech">
            <component
              v-for="tech in app.tech"
              :is="tech + 'SVG'"
              :key="tech"
              :title="tech"
              unmodified
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Apps, App, apps, columns } from "../../scripts/apps"; // '@/' not working
import NavbarVue from "./Navbar.vue";
import ColumnsVue from "./Columns.vue";

const sortedColumn = { name: "weeklyUsers", descending: false };

export type SortedColumn = typeof sortedColumn;

export default defineComponent({
  name: "AppsVue",
  components: { NavbarVue, ColumnsVue },
  data() {
    return { columns, apps, sortedColumn };
  },
  created() {
    for (const key in this.apps)
      if (key == "extensions" || key == "themes")
        for (const app of this.apps[key]) this.getBrowserAppInfo(app);
  },
  methods: {
    formatCount(n: number) {
      return n.toLocaleString() + (n % 1000 == 0 ? "+" : "");
    },
    sort(columnName: keyof App, descending?: boolean) {
      const isSameColumn = columnName == this.sortedColumn.name;
      if (descending == undefined)
        descending = isSameColumn ? !this.sortedColumn.descending : false;
      this.sortedColumn = { name: columnName, descending };
      this.currentApps.sort((a, b) => {
        if (a[columnName]! < b[columnName]!) return descending ? -1 : 1;
        if (a[columnName]! > b[columnName]!) return descending ? 1 : -1;
        return 0;
      });
    },
    getBrowserAppInfo(app: App) {
      if (!app.links.chrome /*  || !0 */) return; // todo
      const id = app.links.chrome.slice(app.links.chrome.lastIndexOf("/") + 1);
      fetch("https://get-cws-item.kristijanros.workers.dev/" + id)
        .then((response) => response.json())
        .then((result) => {
          app.weeklyUsers = result.weeklyUsers;
          app.lastUpdated = new Date(result.lastUpdated);
        });
    },
  },
  computed: {
    path(): string {
      return this.$route.path.split("/").pop()!;
    },
    isBrowserApp(): boolean {
      return this.path == "extensions" || this.path == "themes";
    },
    currentApps(): App[] {
      return this.apps[this.path as keyof Apps] || this.apps.extensions;
    },
  },
  watch: {
    path() {
      if (this.isBrowserApp) this.sort("weeklyUsers", false);
      else this.sort("created", false);
    },
  },
});
</script>

<style lang="scss">
#apps {
  flex: 1;
  background: var(--d);
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
      min-width: 30%;
      padding: 20px;
    }
  }
}
#table {
  overflow: auto;
  & > div {
    background: var(--d);
    border-bottom: 5px solid var(--e);
    & > div {
      @extend .flex-center;
      padding: var(--cell-padding);
    }
  }
  .app-name {
    gap: 20px;
    justify-content: left;
    img {
      width: 40px;
      height: 40px;
    }
    svg {
      margin-left: auto;
      flex-shrink: 0;
    }
    &:hover {
      cursor: pointer;
      &,
      & ~ div {
        background: var(--c);
      }
    }
  }
  .icons {
    flex-wrap: wrap;
    gap: 10px;
    svg {
      vertical-align: middle;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
#app-icon {
  display: flex;
  align-items: center;
  text-align: left;
}
.table-move {
  transition: transform 150ms;
}
</style>
