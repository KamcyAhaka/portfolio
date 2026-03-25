<script setup lang="ts">
import { useMouse } from "~/composables/useMouse";

useMouse();

useHead({
  htmlAttrs: { lang: "en" },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | KamCy.dev` : "KamCy.dev";
  },
  link: [
    // Favicons
    {
      rel: "icon",
      href: "/favicon-96x96.png",
      sizes: "96x96",
      type: "image/png",
    },
    {
      rel: "icon shortcut",
      href: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
  meta: [
    {
      name: "apple-mobile-web-app-title",
      content: "Path Project",
    },
  ],
});
</script>

<template>
  <CustomCursor />
  <NuxtPage />
</template>
