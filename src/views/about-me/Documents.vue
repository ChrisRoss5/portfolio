<template>
  <div :class="{ 'pdf-enabled': $pdfViewerReady }">
    <div v-if="$pdfViewerReady" id="pdf">
      <Transition name="reveal">
        <iframe
          v-if="frameReady"
          v-show="frameLoaded"
          :src="getDocPath(currentDoc)"
          @load="onFrameLoad"
        />
        <!-- #view=fit -->
      </Transition>
      <Transition name="reveal">
        <component
          v-show="!(frameLoaded && frameReady)"
          :is="'LoadingSVG'"
          class="abs-center"
        />
      </Transition>
    </div>
    <template v-for="{ title, files } of docs" :key="title">
      <div class="about-title">{{ title }}</div>
      <div v-if="$pdfViewerReady">
        <div
          v-for="file of files"
          :key="file"
          :class="{ 'file-active': currentDoc.file == file, file: true }"
          @click="currentDoc.file != file && fileChanged({ title, file })"
        >
          {{ file }}
        </div>
      </div>
      <div v-else>
        <a
          v-for="file of files"
          :key="file"
          :href="getDocPath({ title, file })"
          target="_blank"
        >
          {{ file }}
        </a>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DocumentsVue",
  data() {
    const docs = [
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
    ];
    let currentDoc = { title: "CVs", file: "CV-en (2)" };
    const file = new URLSearchParams(location.hash.substring(1)).get("file");
    if (file) {
      let doc = docs.find((d) => d.files.includes(file));
      if (doc) currentDoc = { title: doc.title, file };
    }
    return {
      currentDoc,
      docs,
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
    if (!this.$pdfViewerReady) return;
    location.hash = "file=" + this.currentDoc.file;
    clearTimeout(this.resetTimeout);
    clearTimeout(this.frameTimeout);
    this.reset();
    this.frameReady = false;
    this.frameTimeout = setTimeout(() => (this.frameReady = true), 1000);
    this.intro.offsetWidth; // nosonar
    this.introHeight = getComputedStyle(this.intro).height;
    this.intro.style.height = this.introHeight;
    ({ width: this.sidebarWidth, paddingRight: this.sidebarPadding } =
      getComputedStyle(this.sidebar));
    this.sidebar.style.width = this.sidebarWidth;
    this.intro.offsetWidth; // nosonar
    this.intro.style.height = this.sidebar.style.width = "0";
    this.sidebar.style.padding = "0";
    this.contentWidth = getComputedStyle(this.content).width;
  },
  deactivated() {
    if (!this.$pdfViewerReady) return;
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
    getDocPath(doc: { title: string; file: string }) {
      return `/docs/${doc.title.toLowerCase()}/${doc.file}.pdf`;
    },
    fileChanged(newFile: { title: string; file: string }) {
      this.frameLoaded = false;
      location.hash = "file=" + newFile.file;
      setTimeout(() => (this.currentDoc = newFile), 150);
    },
    onFrameLoad() {
      setTimeout(() => (this.frameLoaded = true));
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
  a {
    display: block;
    padding-bottom: 1rem;
  }
}
.pdf-enabled {
  @include about-narrow;
  padding: 0 !important;
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
      @include abs-cover(absolute, 0, null, 0, -1rem);
      background: var(--special-b);
      width: 5px;
    }
  }
}
#pdf {
  @include abs-cover(absolute, 0, 0, 0, 15vw);
  padding: 0 !important;
  opacity: 0;
  animation: reveal 1s 1s forwards;
  overflow: hidden !important;
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
