<template>
  <div :class="{ 'pdf-enabled': $pdfViewerEnabled }">
    <div
      v-if="!$mediaWidth.isBelow1366px && $pdfViewerEnabled"
      id="pdf"
      class="flex-center"
    >
      <iframe
        v-if="loadFrame"
        :src="`/docs/${currentDoc.title}/${currentDoc.file}.pdf#view=fit`"
      />
    </div>
    <template v-for="{ title, files } of docs" :key="title">
      <div class="about-title">{{ title }}</div>
      <div>
        <div
          v-for="file of files"
          :key="file"
          :class="{ 'file-active': currentDoc.file == file, file: true }"
          @click="currentDoc = { title, file }"
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
          files: ["English B1+", "Oracle Academy (7)"],
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
      intro: document.querySelector("#intro") as HTMLElement,
      sidebar: document.querySelector("#sidebar") as HTMLElement,
      introHeight: "",
      sidebarWidth: "",
      sidebarPadding: "",
      resetTimeout: 0,
      frameTimeout: 0,
      loadFrame: false,
    };
  },
  activated() {
    if (this.$mediaWidth.isBelow1366px || !this.$pdfViewerEnabled) return;
    clearTimeout(this.resetTimeout);
    clearTimeout(this.frameTimeout);
    this.reset();
    this.loadFrame = false;
    this.frameTimeout = setTimeout(() => (this.loadFrame = true), 1000);
    this.intro.offsetWidth, this.sidebar.offsetWidth; // nosonar;
    this.introHeight = getComputedStyle(this.intro).height;
    this.intro.style.height = this.introHeight;
    this.sidebarWidth = getComputedStyle(this.sidebar).width;
    this.sidebar.style.width = this.sidebarWidth;
    this.sidebarPadding = this.sidebar.style.padding;
    this.intro.offsetWidth, this.sidebar.offsetWidth; // nosonar;
    this.intro.style.height = this.sidebar.style.width = "0";
    this.sidebar.style.padding = "0";
  },
  deactivated() {
    if (this.$mediaWidth.isBelow1366px || !this.$pdfViewerEnabled) return;
    this.intro.style.height = this.introHeight;
    this.sidebar.style.width = this.sidebarWidth;
    this.sidebar.style.padding = this.sidebarPadding;
    this.resetTimeout = setTimeout(this.reset, 1000);
  },
  methods: {
    reset() {
      this.intro.style.height = this.sidebar.style.width = "";
      this.sidebar.style.padding = "";
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
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
