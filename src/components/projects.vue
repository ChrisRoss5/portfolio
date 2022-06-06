<template>
  <div id="projects">
    <div id="navbar">
      <router-link to="/extensions">Browser Extensions</router-link>
      <router-link to="/themes">Browser Themes</router-link>
      <router-link to="/web">Web Apps</router-link>
      <router-link to="/desktop">Desktop Apps</router-link>
    </div>
    <table>
      <thead>
        <tr>
          <td
            v-for="column in columns"
            :key="column.name"
            v-show="!column.browserAppSpecific || isBrowserApp"
            :class="{ sortable: !column.unsortable }"
            @click="!column.unsortable && sort(column.name)"
          >
            {{ getTitleCase(column.name) }}
            <svg
              v-if="sortedColumn.name == column.name"
              viewBox="0 0 451.847 451.847"
              :style="{
                transform: `rotate(${sortedColumn.descending ? 0 : 180}deg)`,
              }"
            >
              <path
                d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
              />
            </svg>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="project in projects[path || 'extensions']"
          :key="project.name"
        >
          <td
            v-for="column in columns"
            :key="column.name"
            v-show="!column.browserAppSpecific || isBrowserApp"
            :class="{ sortable: !column.unsortable }"
            :style="{
              textAlign: ['users', 'links'].includes(column.name)
                ? 'center'
                : 'left',
            }"
            @click="!column.unsortable && sort(column.name)"
          >
            <template v-if="column.name == 'name'">
              <div id="app-icon">
                <img :src="getAppImg(project[column.name])" />
                {{ project[column.name] }}
              </div>
            </template>
            <template v-else-if="column.name == 'links'">
              <a
                v-for="(value, key) in project[column.name]"
                :key="key"
                :href="value"
                target="_blank"
              >
                <img class="icon" :src="require(`@/assets/icons/${key}.svg`)" />
              </a>
            </template>
            <template v-else-if="project[column.name]">
              {{ project[column.name] }}
            </template>
            <LoadingSVGVue v-else></LoadingSVGVue>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { App, columns, projects } from "../scripts/data";
import LoadingSVGVue from "./LoadingSVG.vue";
const parser = new DOMParser();

export default defineComponent({
  name: "ProjectsVue",
  components: { LoadingSVGVue },
  data() {
    return {
      columns,
      projects,
      sortedColumn: { name: "users", descending: true },
    };
  },
  mounted() {
    for (const key in this.projects)
      if (key == "extensions" || key == "themes")
        for (const app of this.projects[key]) this.getBrowserAppInfo(app);
  },
  methods: {
    getTitleCase(text: string) {
      const result = text.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
    sort(columnName: string) {
      const isSameColumn = columnName == this.sortedColumn.name;
      const descending = isSameColumn ? !this.sortedColumn.descending : true;
      this.sortedColumn = { name: columnName, descending };
    },
    getAppImg(name: string) {
      return require(`@/assets/apps/${name.replace("/", "")}.webp`);
    },
    getBrowserAppInfo(app: App) {
      if (!app.links.chrome) return;
      fetch(app.links.chrome)
        .then((response) => response.text())
        .then((html) => {
          const doc = parser.parseFromString(html, "text/html");
          const users = doc.querySelector(".e-f-ih")!.textContent as string;
          const updated = doc.querySelector(".h-C-b-p-D-xh-hh")!.textContent;
          app.users = parseInt(users.replace(/\D/g, ""));
          app.lastUpdated = updated as string;
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
  },
});
</script>

<style lang="scss">
#projects {
  flex: 1;
  background: $dark3;
}
#navbar {
  display: flex;
  border-bottom: 10px solid $dark2;
  a {
    flex: 1;
    text-align: center;
    padding: 20px 10px;
  }
}
.router-link-active {
  background: linear-gradient(92deg, $dark1, #0000, $dark1);
  font-weight: bold;
}
table {
  width: 100%;
  border-collapse: collapse;
  border-style: none hidden;
}
thead {
  text-align: center;
  td {
    border-bottom: 10px solid $dark2;
    &.sortable {
      cursor: pointer;
    }
  }
  svg {
    width: 18px;
    height: 18px;
    margin-left: 5px;
  }
}
td {
  padding: 5px 10px;
  border-left: 1px solid rgba($white, 0.25);
  border-right: 1px solid rgba($white, 0.25);
  .icon {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
}
#app-icon {
  display: flex;
  align-items: center;
  gap: 30px;
}
</style>
