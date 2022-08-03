<template>
  <Transition name="modal">
    <div
      v-if="modalVisible"
      class="modal-mask flex-center"
      @click.self="$emit('close')"
    >
      <div class="modal-container" :style="{ width, height }">
        <div class="modal-header">
          <slot name="header"></slot>
          <div class="modal-close flex-center hover" @click="$emit('close')">
            <component :is="'CloseSVG'" />
          </div>
        </div>
        <div class="modal-body">
          <slot name="body"> </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalVue",
  props: {
    modalVisible: Boolean,
    width: String,
    height: String,
  },
  emits: ["close"],
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape") this.$emit("close");
    });
  },
  watch: {
    modalVisible(newVal) {
      if (this.$mediaWidth.isBelow1366px)
        document.body.style.overflow = newVal ? "hidden" : "auto";
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-mask {
  @include abs-cover(fixed, 0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.modal-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 6px;
  background: var(--d);
  box-shadow: -2px -2px 8px var(--special-a), 2px 2px 8px var(--special-b);
  overflow: hidden;
}
.modal-header {
  position: relative;
  padding: 20px 80px 20px 40px;
  font-size: 1.2rem;
  background: var(--e);
}
.modal-body {
  position: relative;
  flex: 1;
}
.modal-close {
  @include abs-cover(absolute, 0, 0, 0, null);
  padding: 0 40px;
}
.modal-container {
  transition: transform 250ms;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 250ms;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container {
  transform: scale(0.9);
}
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
