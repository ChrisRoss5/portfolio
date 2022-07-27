<template>
  <div id="sidebar">
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
import sidebar from "../scripts/sidebar.json";

interface Line {
  indents: number;
  key?: string;
  value?: string;
  bracket?: boolean;
  noComma?: boolean;
}

const lines: Line[] = [{ value: "{", bracket: true, indents: 0 }];
const keys = Object.keys(sidebar);
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const value = sidebar[key as keyof typeof sidebar];
  const noComma = i == keys.length - 1;
  let indents = 1;
  if (typeof value == "string") lines.push({ key, value, indents });
  else if (Array.isArray(value)) {
    lines.push({ indents, key, value: "[", bracket: true });
    for (let j = 0; j < value.length; j++) {
      const noComma2 = j == value.length - 1;
      lines.push({ value: value[j], indents: 2, noComma: noComma2 });
    }
    lines.push({ indents, value: "]", bracket: true, noComma });
  } else {
    lines.push({ indents, key, value: "{", bracket: true });
    const keys2 = Object.keys(value);
    for (let j = 0; j < keys2.length; j++) {
      const key2 = keys2[j];
      const value2 = value[key2 as keyof typeof value];
      const noComma2 = j == keys2.length - 1;
      lines.push({ key: key2, value: value2, indents: 2, noComma: noComma2 });
    }
    lines.push({ indents, value: "}", bracket: true, noComma });
  }
}
lines.push({ value: "}", bracket: true, indents: 0 });

export default defineComponent({
  name: "SidebarVue",
  emits: ["completed"],
  data() {
    return { lines, pause: 50 };
  },
  mounted() {
    if (this.$mediaWidth.isBelow1366px) this.$emit("completed");
    else setTimeout(() => this.$emit("completed"), lines.length * this.pause);
  },
});
</script>

<style lang="scss">
#sidebar {
  grid-area: b;
  padding-right: 5vw;
  background: var(--b);
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  z-index: 1;
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
  width: 2rem;
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
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    transform: translateX(-3px);
    background: var(--dot);
  }
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
.collapsed {
  // todo
  max-width: 302px;
  transition: 1s;
  max-width: 0;
  padding: 0;
  white-space: pre;
  overflow: hidden;
}
</style>
