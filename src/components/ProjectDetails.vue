<template>
  <ModalVue
    :width="'70vw'"
    :height="'80vh'"
    :modalVisible="modalOpen"
    @close="$emit('close')"
    @touchstart.passive="touchStart"
    @touchmove.passive="touchMove"
    @touchend.passive="touchEnd"
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
            :class="{ disabled: projectIdx == 0, hover: true }"
            @click="swipeProject(false)"
          >
            <component :is="'ArrowDownSVG'" style="transform: rotate(90deg)" />
            Previous
          </div>
          <div
            :class="{
              disabled: projectIdx == currentProjects.length - 1,
              hover: true,
            }"
            @click="swipeProject(true)"
          >
            Next
            <component :is="'ArrowDownSVG'" style="transform: rotate(-90deg)" />
          </div>
        </div>
        <div
          id="modal-project-description"
          v-html="modalProject.description"
        ></div>
        <div id="modal-screenshot">
          <component
            v-if="modalProject.name == 'My Developer Portfolio'"
            :is="'LogoSVG'"
          />
          <img
            v-else
            v-show="screenshot.loaded"
            :src="require('@/assets/png-app-screenshots/' + img)"
            alt="screenshot"
            v-loadedifcomplete="screenshot"
            @load="screenshot.loaded = true"
          />
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
    return {
      x0: 0,
      y0: 0,
      isMultitouch: false,
      screenshot: {
        loaded: false,
      },
    };
  },
  methods: {
    touchStart(e: TouchEvent) {
      e.stopPropagation();
      this.isMultitouch = e.touches.length > 1;
      this.x0 = e.changedTouches[0].screenX;
      this.y0 = e.changedTouches[0].screenY;
    },
    touchMove(e: TouchEvent) {
      e.stopPropagation();
    },
    touchEnd(e: TouchEvent) {
      e.stopPropagation();
      if (e.touches.length || window.visualViewport.scale != 1) return;
      if (this.isMultitouch) return (this.isMultitouch = false);
      const x1 = e.changedTouches[0].screenX;
      const y1 = e.changedTouches[0].screenY;
      const deg = (Math.atan2(y1 - this.y0, x1 - this.x0) * 180) / Math.PI;
      const isHoriz = (-45 < deg && deg < 45) || -135 > deg || deg > 135;
      if (isHoriz && Math.abs(x1 - this.x0) > 40)
        this.swipeProject(x1 < this.x0);
    },
    swipeProject(right: boolean) {
      const newIdx = this.projectIdx + (right ? 1 : -1);
      const lastIdx = this.currentProjects.length - 1;
      this.$emit(0 <= newIdx && newIdx <= lastIdx ? "swipe" : "close", newIdx);
    },
  },
  computed: {
    projectIdx(): number {
      return this.currentProjects.indexOf(this.modalProject);
    },
    img(): string {
      return `${this.modalProject.screenshot}.png`;
    },
  },
  directives: {
    loadedifcomplete(el, binding) {
      binding.value.loaded = el.complete;
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
  @include abs-cover(absolute, 0, null, null, 40px);
  background: var(--e);
  display: flex;
  user-select: none;
  div {
    padding: 10px;
    &.disabled {
      pointer-events: none;
      opacity: 0.5;
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
#modal-screenshot {
  flex: 1 1 0;
  min-height: 0;
  background: var(--b);
  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: reveal 250ms;
  }
}
</style>
