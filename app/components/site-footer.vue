<script setup lang="ts">
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/kamcy",
    icon: "i-simple-icons-github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kamcy",
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
    <div class="social-media-container flex gap-3">
      <NuxtLink v-for="link in socialLinks" :key="link.name" :to="link.url" target="_blank">
        <div class="social-media-icon">
          <Icon :name="link.icon" />
        </div>
      </NuxtLink>
    </div>
    <p class="text-sm text-gray-400">&copy; {{ new Date().getFullYear() }} KamCy. All rights reserved.</p>
    <p class="text-sm text-gray-400">Built with <span class="text-red-500">❤</span> by KamCy</p>
  </footer>
</template>
