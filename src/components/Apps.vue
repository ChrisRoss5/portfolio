<template>
  <div id="apps">
    <NavbarVue :path="path"></NavbarVue>
    <ColumnsVue
      :columns="columns"
      :sortedColumn="sortedColumn"
      :isBrowserApp="isBrowserApp"
      @sort="sort($event)"
    ></ColumnsVue>
    <div id="table">
      <TransitionGroup name="table" :key="path">
        <div v-for="app in currentApps" :key="app.name">
          <div class="app-name">
            <img
              :src="require(`@/assets/apps/${app.img}.webp`)"
              :class="{ invert: app.img == 'My Developer Portfolio' }"
              alt="logo"
            />
            {{ app.name }}
            <svg viewBox="0 0 460 460">
              <path
                d="M230,0C102.975,0,0,102.975,0,230s102.975,230,230,230s230-102.974,230-230S357.025,0,230,0z M268.333,377.36
			c0,8.676-7.034,15.71-15.71,15.71h-43.101c-8.676,0-15.71-7.034-15.71-15.71V202.477c0-8.676,7.033-15.71,15.71-15.71h43.101
			c8.676,0,15.71,7.033,15.71,15.71V377.36z M230,157c-21.539,0-39-17.461-39-39s17.461-39,39-39s39,17.461,39,39
			S251.539,157,230,157z"
              />
            </svg>
          </div>
          <div>{{ app.created.toLocaleDateString("en-CA") }}</div>
          <div v-if="app.lastUpdated">
            {{ app.lastUpdated.toLocaleDateString("en-CA") }}
          </div>
          <div v-else-if="isBrowserApp"><LoadingSVGVue></LoadingSVGVue></div>
          <div v-if="app.weeklyUsers">{{ formatCount(app.weeklyUsers) }}</div>
          <div v-else-if="isBrowserApp"><LoadingSVGVue></LoadingSVGVue></div>
          <div class="icons links">
            <a
              v-for="(value, key) in app.links"
              :key="key"
              :href="value"
              :class="{ invert: /(github|home|download)/.test(key) }"
              target="_blank"
            >
              <img :src="require(`@/assets/icons/${key}.svg`)" alt="icon" />
            </a>
          </div>
          <div class="icons tech">
            <img
              v-for="tech in app.tech"
              :key="tech"
              :src="require(`@/assets/icons/tech/${tech}.svg`)"
              :title="tech"
              alt="icon"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Apps, App, apps, columns } from "../scripts/apps";
import NavbarVue from "./Navbar.vue";
import ColumnsVue from "./Columns.vue";
import LoadingSVGVue from "./LoadingSVG.vue";

const sortedColumn = { name: "weeklyUsers", descending: false };

export type SortedColumn = typeof sortedColumn;

export default defineComponent({
  name: "AppsVue",
  components: { NavbarVue, ColumnsVue, LoadingSVGVue },
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
      if (!app.links.chrome) return; // todo
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
      return this.$route.path.replaceAll("/", "");
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
    }
  }
  .icons {
    flex-wrap: wrap;
    gap: 10px;
    img {
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

/* transitions */

.table-move {
  transition: transform 150ms;
}
</style>
