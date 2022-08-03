<template>
  <div
    id="sidebar"
    @touchstart="hovering = true"
    @touchend="hovering = false"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div v-for="(line, i) in lines" :key="i">
      <div class="number" :style="{ animationDelay: i * this.pause + 'ms' }">
        {{ i + 1 }}
      </div>
      <div class="line" :style="{ animationDelay: i * this.pause + 'ms' }">
        <div class="dot" v-for="i in line.indents * 2" :key="i">•</div>
        <div>
          <span v-if="line.indents == 0" class="root-bracket">
            {{ line.value }}
          </span>
          <template v-else>
            <span v-if="line.key" class="key">"{{ line.key }}"</span>
            <span v-if="line.key">: </span>
            <span v-if="line.bracket" class="bracket">{{ line.value }}</span>
            <span v-else class="value">"{{ line.value }}"</span>
            <span v-if="!(line.noComma || (line.key && line.bracket))">,</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import lines from "@/scripts/sidebar-converter";

export default defineComponent({
  name: "SidebarVue",
  emits: ["completed"],
  data() {
    return {
      lines,
      pause: 50,
      pause2: 400,
      hovering: false,
    };
  },
  mounted() {
    if (this.$mediaWidth.isBelow1366px) this.animationCompleted();
    else setTimeout(this.animationCompleted, lines.length * this.pause);
  },
  methods: {
    animationCompleted() {
      this.$emit("completed");
    },
    wordEmphasis(word: HTMLElement) {
      if (!this.hovering) return;
      word.style.textShadow = "none";
      word.offsetWidth; // nosonar
      word.style.textShadow = "0 0 0.8rem currentcolor";
      setTimeout(() => {
        word.style.textShadow = "none";
        setTimeout(() => this.wordEmphasis(word), this.getRandPause());
      }, this.pause2);
    },
    getRandPause() {
      return Math.random() * 3 * this.pause2;
    },
  },
  watch: {
    hovering(newVal) {
      if (!newVal) return;
      const words = document.querySelectorAll(".key, .value");
      for (const word of words as unknown as HTMLElement[]) {
        setTimeout(() => this.wordEmphasis(word), this.getRandPause());
      }
    },
  },
});
</script>

<style lang="scss">
#sidebar {
  grid-area: b;
  padding-right: 5vw;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  overflow: hidden auto;
  z-index: 1;
  white-space: pre;
  transition: width 1s, padding 1s;
  background: radial-gradient(
      ellipse at 100% 0,
      transparent 0 60%,
      var(--special-b) 250%
    ),
    radial-gradient(
      ellipse at 30% 100%,
      transparent 0 60%,
      var(--special-a) 300%
    );
  & > div {
    flex: 1;
    display: flex;
  }
}
.number,
.line {
  display: flex;
  align-items: center;
  opacity: 0;
}
.number {
  user-select: none;
  justify-content: right;
  padding-right: 10px;
  min-width: 2rem;
  background: var(--e);
  color: var(--number);
  animation: 0.5s number-enter forwards;
}
.line {
  position: relative;
  gap: 6px;
  margin-left: 3px;
  animation: 0.5s line-enter forwards;
}
.dot {
  user-select: none;
  color: var(--dot);
  &:nth-child(1)::before,
  &:nth-child(3)::before {
    content: "";
    @include abs-cover(absolute, 0, null, 0, null);
    width: 1px;
    transform: translateX(-3px);
    background: var(--dot);
  }
}
.key,
.value {
  will-change: text-shadow;
  transform: translateZ(0);
  transition: text-shadow 400ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  backface-visibility: hidden;
  perspective: 1000;
}
.key {
  color: var(--key);
}
.value {
  color: var(--value);
}
.bracket {
  color: var(--bracket);
}
.root-bracket {
  color: var(--root-bracket);
}
@keyframes line-enter {
  0% {
    filter: brightness(5);
  }
  50%,
  100% {
    opacity: 1;
  }
}
@keyframes number-enter {
  0% {
    color: #fff;
  }
  50%,
  100% {
    opacity: 1;
  }
}
</style>
