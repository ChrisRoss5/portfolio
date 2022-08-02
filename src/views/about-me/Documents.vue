<template>
  <div :class="{ 'pdf-enabled': $pdfViewerEnabled }">
    <div v-if="!$mediaWidth.isBelow1366px && $pdfViewerEnabled" id="pdf">
      <Transition name="reveal">
        <iframe
          v-if="frameReady"
          v-show="frameLoaded"
          :src="`/docs/${currentDoc.title}/${currentDoc.file}.pdf`"
          @load="frameLoaded = true"
        />
        <!-- #view=fit -->
      </Transition>
      <Transition name="reveal">
        <component v-show="!(frameLoaded && frameReady)" :is="'LoadingSVG'" />
      </Transition>
    </div>
    <template v-for="{ title, files } of docs" :key="title">
      <div class="about-title">{{ title }}</div>
      <div>
        <div
          v-for="file of files"
          :key="file"
          :class="{ 'file-active': currentDoc.file == file, file: true }"
          @click="fileChanged({ title, file })"
        >
          {{ file }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DocumentsVue",
  data() {
    return {
      currentDoc: { title: "CVs", file: "CV-en (2)" },
      docs: [
        {
          title: "CVs",
          files: ["CV-en (2)", "CV-hr (2)"],
        },
        {
          title: "Competitions",
          files: ["AZOO (6)", "Idea of the Year", "INOVA (6)"],
        },
        {
          title: "Certificates",
          files: ["Oracle Academy (7)", "English B1+"],
        },
        {
          title: "Education",
          files: ["Diplomas (8)", "Europass-en (2)", "Europass-hr (2)"],
        },
        {
          title: "References",
          files: ["CARNET", "Mario Tretinjak"],
        },
      ],
      intro: undefined as unknown as HTMLElement,
      sidebar: undefined as unknown as HTMLElement,
      content: undefined as unknown as HTMLElement,
      introHeight: "",
      sidebarWidth: "",
      sidebarPadding: "",
      contentWidth: "",
      resetTimeout: 0,
      frameTimeout: 0,
      frameReady: false,
      frameLoaded: false,
    };
  },
  mounted() {
    this.intro = document.querySelector("#intro") as HTMLElement;
    this.sidebar = document.querySelector("#sidebar") as HTMLElement;
    this.content = document.querySelector(".content") as HTMLElement;
  },
  activated() {
    if (this.$mediaWidth.isBelow1366px || !this.$pdfViewerEnabled) return;
    clearTimeout(this.resetTimeout);
    clearTimeout(this.frameTimeout);
    this.reset();
    this.frameReady = false;
    this.frameTimeout = setTimeout(() => (this.frameReady = true), 1000);
    this.intro.offsetWidth; // nosonar;
    this.introHeight = getComputedStyle(this.intro).height;
    this.intro.style.height = this.introHeight;
    ({ width: this.sidebarWidth, paddingRight: this.sidebarPadding } =
      getComputedStyle(this.sidebar));
    this.sidebar.style.width = this.sidebarWidth;
    this.intro.offsetWidth; // nosonar;
    this.intro.style.height = this.sidebar.style.width = "0";
    this.sidebar.style.padding = "0";
    this.contentWidth = getComputedStyle(this.content).width;
  },
  deactivated() {
    if (this.$mediaWidth.isBelow1366px || !this.$pdfViewerEnabled) return;
    this.intro.style.height = this.introHeight;
    this.sidebar.style.width = this.sidebarWidth;
    this.sidebar.style.paddingRight = this.sidebarPadding;
    this.content.style.maxWidth = this.contentWidth;
    this.resetTimeout = setTimeout(this.reset, 1000);
  },
  methods: {
    reset() {
      this.intro.style.height = this.sidebar.style.width = "";
      this.sidebar.style.padding = "";
      this.content.style.maxWidth = "";
    },
    fileChanged(newFile: { title: string; file: string }) {
      this.frameLoaded = false;
      setTimeout(() => (this.currentDoc = newFile), 150);
    },
    iframeLoaded() {
      console.log(1);
    },
  },
});
</script>

<style lang="scss">
#about.documents {
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .pdf-enabled {
    @include about-narrow;
    padding: 0;
    height: 100%;
    width: 15vw;
    .about-title {
      display: flex !important;
      width: 100% !important;
      transform: none !important;
    }
    .file {
      cursor: pointer;
    }
    .file-active {
      position: relative;
      color: var(--special-b);
      &::before {
        content: "";
        position: absolute;
        left: -1rem;
        top: 0;
        bottom: 0;
        background: var(--special-b);
        width: 5px;
      }
    }
  }
}
#pdf {
  position: absolute;
  top: 0;
  left: 15vw;
  right: 0;
  bottom: 0;
  padding: 0 !important;
  opacity: 0;
  animation: reveal 1s 1s forwards;
  overflow: hidden !important;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
  animation: reveal 1s;
}
</style>
