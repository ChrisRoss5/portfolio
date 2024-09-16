<template>
  <div :class="{ 'pdf-enabled': $pdfViewerReady }">
    <div v-if="$pdfViewerReady" id="pdf">
      <Transition name="reveal">
        <iframe
          v-if="frameReady"
          v-show="frameLoaded"
          @load="onFrameLoad"
          ref="iframe"
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
          @click="currentDoc.file != file && fileChanged(file)"
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
    return {
      currentDoc: { title: "CVs and Resumes", file: "Resume-en" },
      docs: [
        {
          title: "CVs and Resumes",
          files: ["Resume-en"],
        },
        {
          title: "Competitions",
          files: ["AZOO (6)", "Idea of the Year 2021", "INOVA (6)"],
        },
        {
          title: "Certificates",
          files: ["Oracle Academy (7)", "English B1+", "Mensa"],
        },
        {
          title: "Education",
          files: ["HS Diplomas (8)", "HS Europass-en (2)", "HS Europass-hr (2)"],
        },
        {
          title: "References",
          files: ["CARNET", "Mario Tretinjak"],
        },
      ],
      intro: undefined as unknown as HTMLElement,
      sidebar: undefined as unknown as HTMLElement,
      content: undefined as unknown as HTMLElement,
      iframeContentWindow: undefined as unknown as Window,
      introHeight: "",
      sidebarWidth: "",
      sidebarPadding: "",
      contentWidth: "",
      resetTimeout: 0,
      frameTimeout: 0,
      frameReady: false,
      frameLoaded: false,
      noTransitionsSheet: null as HTMLElement | null,
    };
  },
  beforeRouteEnter(to, from) {
    if (window.matchMedia("(max-width: 1366px)") && from.path != "/") return;
    const style = document.createElement("style");
    style.id = "no-transitions";
    style.innerHTML = `
      #intro, #columns { transition: none !important; }
      #sidebar { transition: 1ms !important; }
      #app { transition: none !important; opacity: 0; }`;
    document.querySelector("head")!.appendChild(style);
  },
  mounted() {
    this.intro = document.querySelector("#intro") as HTMLElement;
    this.sidebar = document.querySelector("#sidebar") as HTMLElement;
    this.content = document.querySelector(".content") as HTMLElement;
    this.noTransitionsSheet = document.querySelector("#no-transitions");
  },
  activated() {
    if (this.noTransitionsSheet) {
      setTimeout(() => {
        this.noTransitionsSheet!.remove();
        this.noTransitionsSheet = null;
      }, 250);
    }
    if (!this.$pdfViewerReady) return;
    this.reset();
    this.frameReady = false;
    this.frameTimeout = setTimeout(
      () => {
        this.frameReady = true;
        this.$nextTick(() => {
          this.iframeContentWindow = (this.$refs
            .iframe as HTMLIFrameElement)!.contentWindow!;
          this.updateIframe();
        });
      },
      this.noTransitionsSheet ? 0 : 1000
    );
    // Animations
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
      clearTimeout(this.resetTimeout);
      clearTimeout(this.frameTimeout);
      this.intro.style.height = this.sidebar.style.width = "";
      this.sidebar.style.padding = "";
      this.content.style.maxWidth = "";
    },
    updateIframe() {
      const hash = "#" + this.currentDoc.file;
      if (!location.hash) this.$router.replace({ hash });
      else location.hash = hash;
      const newUrl = this.getDocPath(this.currentDoc);
      if (this.iframeContentWindow)
        this.iframeContentWindow.location.replace(newUrl);
    },
    getDocPath(doc: { title: string; file: string }) {
      return `/docs/${doc.title.toLowerCase()}/${doc.file}.pdf`;
    },
    fileChanged(file: string) {
      this.frameLoaded = false;
      setTimeout(() => (location.hash = file), 150);
    },
    onFrameLoad() {
      setTimeout(() => (this.frameLoaded = true));
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        const file = decodeURI(newValue.hash.substring(1));
        if (file) {
          let doc = this.docs.find((d) => d.files.includes(file));
          if (doc) this.currentDoc = { title: doc.title, file };
          this.updateIframe();
        }
      },
      immediate: true,
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
    padding-right: 0 !important;
    padding-left: 0 !important;
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
