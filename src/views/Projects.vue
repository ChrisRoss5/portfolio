<template>
  <div>
    <div id="projects">
      <TransitionGroup name="table" :key="$route.path">
        <div
          v-for="(app, i) in currentProjects"
          :key="app.name"
          :style="{
            borderBottomColor: rowsEnteringDirection
              ? 'transparent'
              : 'var(--e)',
            opacity: rowsEnteringDirection ? 0 : 1,
            animation: rowsEnteringDirection
              ? `rows-enter-${rowsEnteringDirection} 600ms ${i * 50}ms forwards`
              : `none`,
          }"
        >
          <div class="app-name" @click="modalOpen = !!(modalProject = app)">
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
            <div v-if="app.updated">
              {{ app.updated.toLocaleDateString("en-CA") }}
            </div>
            <div v-else-if="$isBrowserApp">
              <component :is="'LoadingSVG'" />
            </div>
          </Transition>
          <Transition name="reveal" mode="out-in">
            <div v-if="app.weeklyUsers">{{ formatCount(app.weeklyUsers) }}</div>
            <div v-else-if="$isBrowserApp">
              <component :is="'LoadingSVG'" />
            </div>
          </Transition>
          <div class="icons links">
            <a
              v-for="(value, key) in app.links"
              :key="key"
              :href="value"
              :class="{ invert: /(github|home|download)/.test(key) }"
              target="_blank"
              :download="value?.endsWith('exe') ? '' : null"
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
    <ProjectDetails
      :modalOpen="modalOpen"
      :modalProject="modalProject"
      :currentProjects="currentProjects"
      @close="modalOpen = false"
      @swipe="modalProject = currentProjects[$event]"
    />
  </div>
</template>

<script lang="ts">
import { SortedColumn } from "@/App.vue";
import ProjectDetails from "@/components/ProjectDetails.vue";
import { Project, Projects, projects } from "@/scripts/projects";
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "ProjectsVue",
  components: { ProjectDetails },
  props: {
    sortedColumn: {
      type: Object as PropType<SortedColumn>,
      required: true,
    },
  },
  data() {
    return {
      projects,
      rowsEnteringDirection: "left" as "left" | "right" | false,
      modalOpen: false,
      modalProject: {} as Project,
    };
  },
  methods: {
    formatCount(n: number) {
      return n.toLocaleString() + (n % 1000 == 0 ? "+" : "");
    },
    getBrowserAppInfo(app: Project) {
      if (!app.links.chrome || app.updated) return;
      const id = app.links.chrome.slice(app.links.chrome.lastIndexOf("/") + 1);
      return fetch("https://get-cws-item.kristijanros.workers.dev/" + id)
        .then((response) => response.json())
        .then((result) => {
          app.weeklyUsers = result.weeklyUsers;
          app.updated = new Date(result.lastUpdated);
        });
    },
    sort(col: SortedColumn) {
      if (!col.isInitial) this.rowsEnteringDirection = false;
      const name = col.name as keyof Project;
      this.currentProjects.sort((a, b) => {
        if (a[name]! < b[name]!) return col.descending ? 1 : -1;
        if (a[name]! > b[name]!) return col.descending ? -1 : 1;
        return 0;
      });
    },
  },
  computed: {
    currentProjects(): Project[] {
      return this.projects[this.$pathEnding as keyof Projects];
    },
  },
  watch: {
    $pathEnding: {
      handler(newVal: string, prevVal: string) {
        const keys = Object.keys(this.projects);
        const [i1, i2] = [keys.indexOf(newVal), keys.indexOf(prevVal)];
        this.rowsEnteringDirection = i1 < i2 || i2 == -1 ? "left" : "right";
        if (this.$isBrowserApp) {
          Promise.all(
            this.currentProjects.map(this.getBrowserAppInfo)
          ) /* .then(
            () =>
              setTimeout(
                () => this.sort({ ...this.sortedColumn, isInitial: false }),
                500
              )
          ) */;
        }
      },
      immediate: true,
    },
    sortedColumn: {
      handler(newVal: SortedColumn) {
        this.sort(newVal);
      },
      immediate: true,
    },
  },
});
</script>

<style lang="scss">
#columns > div.first {
  min-width: 30%;
  padding: 0 20px;
}
#projects {
  overflow: hidden auto;
  & > div {
    display: flex;
    border-bottom: 5px solid;
    & > div {
      transition: background 150ms;
      flex: 1;
      @extend .flex-center;
      padding: var(--cell-padding);
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
.app-name {
  min-width: 30%;
  padding: 20px !important;
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
  &:not(#modal-project-header):hover {
    cursor: pointer;
    &,
    & ~ div {
      background: var(--c);
    }
  }
}
#app-icon {
  display: flex;
  align-items: center;
  text-align: left;
}
.table-move {
  transition: transform 250ms;
  &,
  * {
    animation: none !important;
  }
}
$directions: (
  "rows-enter-left": -2rem,
  "rows-enter-right": 2rem,
);
@each $name, $direction in $directions {
  @keyframes #{$name} {
    0% {
      transform: translateX($direction);
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
}
</style>
