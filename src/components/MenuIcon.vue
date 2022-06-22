<template>
  <div id="menu-icon" @click="$emit('open')">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({ name: "MenuIcon", emits: ["open"] });
</script>

<style lang="scss">
#menu-icon {
  position: absolute;
  top: 5vw;
  right: 5vw;
  height: 1.3rem;
  width: 1.3rem;
  cursor: pointer;
  z-index: 2;
  &::after {
    content: "";
    position: absolute;
    top: -5vw;
    right: -5vw;
    left: -5vw;
    bottom: -5vw;
  }
  div {
    position: absolute;
    height: 0.15rem;
    width: 100%;
    background: var(--a);
    border-radius: 1rem;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.5s;
    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2),
    &:nth-child(3) {
      top: 50%;
    }
    &:nth-child(4) {
      top: 100%;
    }
  }
  &.open div {
    &:nth-child(1),
    &:nth-child(4) {
      top: 50%;
      left: 50%;
      width: 0;
    }
    &:nth-child(2) {
      transform: rotate(45deg);
    }
    &:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
}
</style>
