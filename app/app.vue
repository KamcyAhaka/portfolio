<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const updateMousePosition = (e: MouseEvent) => {
  document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
  document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
};

onMounted(() => {
  window.addEventListener("mousemove", updateMousePosition);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", updateMousePosition);
});
</script>
