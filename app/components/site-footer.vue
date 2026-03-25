<script setup lang="ts">
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/KamcyAhaka",
    icon: "i-simple-icons-github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/divine-ahaka",
    icon: "i-simple-icons-linkedin",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/kamcyahaka",
    icon: "i-simple-icons-instagram",
  },
];
</script>

<template>
  <footer
    class="site-footer flex flex-col items-center justify-center gap-4 py-7 md:flex-row md:justify-between md:px-16 lg:px-24 xl:px-48"
  >
    <div class="social-media-container flex w-full gap-3">
      <NuxtLink v-for="link in socialLinks" :key="link.name" v-magnetic :to="link.url" target="_blank">
        <div class="social-media-icon">
          <Icon :name="link.icon" />
        </div>
      </NuxtLink>
    </div>
    <p class="w-full text-center text-sm text-gray-400">
      &copy; {{ new Date().getFullYear() }} KamCy. All rights reserved.
    </p>
    <p class="w-full max-w-xs text-center text-sm text-balance text-gray-400 md:text-right">
      Built with
      <a
        href="https://nuxt.com"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-white/90 transition-colors hover:text-(--accent)"
        >Nuxt 4</a
      >
      &
      <a
        href="https://tailwindcss.com"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-white/90 transition-colors hover:text-(--accent)"
        >Tailwind CSS</a
      >. Devlogs powered by
      <a
        href="https://content.nuxt.com"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-white/90 transition-colors hover:text-(--accent)"
        >Nuxt Content</a
      >
      &
      <a
        href="https://nuxt.studio"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-white/90 transition-colors hover:text-(--accent)"
        >Nuxt Studio</a
      >. Hosted on
      <a
        href="https://vercel.com"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-white/90 transition-colors hover:text-(--accent)"
        >Vercel</a
      >.
    </p>
  </footer>
</template>
