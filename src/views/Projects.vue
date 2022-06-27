<template>
  <div id="projects">
    <TransitionGroup name="table" :key="$route.path">
      <div
        v-for="(app, i) in currentProjects"
        :key="app.name"
        :style="{
          borderBottomColor: isTableEntering ? 'transparent' : 'var(--e)',
          opacity: isTableEntering ? 0 : 1,
          animation: isTableEntering
            ? `table-row 600ms ${i * 50}ms forwards`
            : `none`,
        }"
      >
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
          <div v-for="tech in app.tech" :key="tech" :title="tech">
            <component :is="tech + 'SVG'" unmodified />
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Projects, Project, projects } from "@/scripts/projects";
import { SortedColumn } from "@/App.vue";

export default defineComponent({
  name: "ProjectsVue",
  props: {
    sortedColumn: {
      type: Object as PropType<SortedColumn>,
      required: true,
    },
  },
  data() {
    return { projects, isTableEntering: true };
  },
  created() {
    for (const key in this.projects)
      if (key == "extensions" || key == "themes")
        for (const app of this.projects[key]) this.getBrowserAppInfo(app);
  },
  methods: {
    formatCount(n: number) {
      return n.toLocaleString() + (n % 1000 == 0 ? "+" : "");
    },
    getBrowserAppInfo(app: Project) {
      if (!app.links.chrome) return;
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
    isBrowserApp(): boolean {
      return /extensions|themes/.test(this.$route.path);
    },
    currentProjects(): Project[] {
      const location = this.$route.path.split("/").pop()! as keyof Projects;
      return this.projects[location] || this.projects.extensions;
    },
  },
  watch: {
    $route() {
      this.isTableEntering = true;
    },
    sortedColumn(newVal: SortedColumn) {
      if (newVal.isInitial) this.isTableEntering = false;
      const name = newVal.name as keyof Project;
      this.currentProjects.sort((a, b) => {
        if (a[name]! < b[name]!) return newVal.descending ? -1 : 1;
        if (a[name]! > b[name]!) return newVal.descending ? 1 : -1;
        return 0;
      });
    },
  },
});
</script>

<style lang="scss">
#columns > div:first-of-type {
  min-width: 30%;
  padding: 0 20px;
}
#projects > div {
  display: flex;
  & > div {
    flex: 1;
    &:first-of-type {
      min-width: 30%;
      padding: 20px;
    }
  }
}
#projects {
  overflow: auto;
  & > div {
    background: var(--d);
    border-bottom: 5px solid;
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
  &,
  * {
    animation: none !important;
  }
}
@keyframes table-row {
  0% {
    transform: translateY(-50%);
  }
  50% {
    opacity: 1;
    transform: none;
  }
  100% {
    opacity: 1;
    border-bottom-color: var(--e);
  }
}
</style>
