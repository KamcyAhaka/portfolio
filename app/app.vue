<template>
  <CustomCursor />
  <NuxtPage />
</template>

<script setup lang="ts">
import { useMouse } from "~/composables/useMouse";

useMouse();
</script>
