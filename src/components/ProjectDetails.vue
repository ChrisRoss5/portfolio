<template>
  <ModalVue
    :width="'70vw'"
    :height="'80vh'"
    :modalVisible="modalOpen"
    @close="$emit('close')"
  >
    <template #header>
      <div id="modal-project-header" class="app-name">
        <img
          :src="require(`@/assets/webp-app-logos/${modalProject.img}.webp`)"
          :class="{ invert: modalProject.img == 'My Developer Portfolio' }"
          alt="logo"
        />
        <div>{{ modalProject.name }}</div>
        <div id="modal-links-container">
          <div id="modal-links">Links:</div>
          <div class="icons links flex-center">
            <a
              v-for="(value, key) in modalProject.links"
              :key="key"
              :href="value"
              :class="{ invert: /(github|home|download)/.test(key) }"
              target="_blank"
            >
              <component :is="key + 'SVG'" unmodified />
            </a>
          </div>
        </div>
      </div>
    </template>
    <template #body>
      <div id="modal-project-body">
        <div id="modal-nav">
          <div
            :class="{ disabled: projectIdx == 0 }"
            @click="$emit('next', projectIdx - 1)"
          >
            <component :is="'ArrowDownSVG'" style="transform: rotate(90deg)" />
            Previous
          </div>
          <div
            :class="{ disabled: projectIdx == currentProjects.length - 1 }"
            @click="$emit('next', projectIdx + 1)"
          >
            Next
            <component :is="'ArrowDownSVG'" style="transform: rotate(-90deg)" />
          </div>
        </div>
        <div
          id="modal-project-description"
          v-html="modalProject.description"
        ></div>
        <div id="modal-screenshot-container">
          <component
            v-if="modalProject.name == 'My Developer Portfolio'"
            :is="'LogoSVG'"
          />
          <Transition v-else name="reveal">
            <img
              v-show="screenshotLoaded"
              id="modal-screenshot"
              :src="screenshot"
              alt="screenshot"
              @load="screenshotLoaded = true"
          /></Transition>
        </div>
      </div>
    </template>
  </ModalVue>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Project } from "@/scripts/projects";
import ModalVue from "@/components/reusable/Modal.vue";

export default defineComponent({
  name: "ProjectDetails",
  components: { ModalVue },
  props: {
    modalOpen: Boolean,
    modalProject: {
      type: Object as PropType<Project>,
      required: true,
    },
    currentProjects: {
      type: Object as PropType<Project[]>,
      required: true,
    },
  },
  data() {
    return { screenshot: "", screenshotLoaded: false };
  },
  methods: {
    loaded() {
      setTimeout(() => {
        this.screenshotLoaded = true;
      }, 100);
    },
  },
  computed: {
    projectIdx(): number {
      return this.currentProjects.indexOf(this.modalProject);
    },
  },
  watch: {
    projectIdx() {
      this.screenshotLoaded = false;
      const img = `${this.modalProject.screenshot}.png`;
      this.screenshot = require("@/assets/png-app-screenshots/" + img);
    },
  },
});
</script>

<style lang="scss">
#modal-project-header,
#modal-links-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
#modal-links {
  border-left: 1px solid var(--a-05);
  padding: 0 20px;
}
#modal-project-body {
  height: calc(100% - 40px);
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}
#modal-nav {
  position: absolute;
  left: 40px;
  top: 0;
  background: var(--e);
  display: flex;
  user-select: none;
  div {
    padding: 10px;
    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    &:hover {
      cursor: pointer;
      color: var(--f);
      path {
        fill: var(--f);
      }
    }
  }
  border-radius: 0 0 6px 6px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    right: -6px;
    width: 6px;
    height: 6px;
    background-image: radial-gradient(
      circle at 6px 6px,
      #0000 0,
      #0000 6px,
      var(--e) 6px
    );
  }
  &::after {
    left: -6px;
    background-image: radial-gradient(
      circle at 0 6px,
      #0000 0,
      #0000 6px,
      var(--e) 6px
    );
  }
}
#modal-project-description {
  padding: 40px;
}
#modal-screenshot-container {
  flex: 1 1 0;
  min-height: 0;
  background: var(--b);
  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
#modal-screenshot.reveal-leave-active {
  transition: none;
}
</style>
