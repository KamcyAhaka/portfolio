<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};
</script>

<template>
  <header class="site-header">
    <nav
      class="site-nav fixed top-0 z-50 flex h-20 w-screen items-center justify-between px-7 md:px-16 lg:px-24 xl:px-48"
    >
      <NuxtLink to="/" class="site-logo z-[60] flex text-lg font-bold md:tracking-wide" @click="closeMenu">
        <img src="/logo.svg" alt="logo" class="h-6 w-6" />
        <span>amCy</span>
      </NuxtLink>

      <!-- Desktop Menu -->
      <menu class="site-nav-list text-gray-2 hidden items-center gap-3 text-sm md:flex md:gap-8 md:text-base">
        <li class="site-nav-item">
          <NuxtLink v-magnetic to="/#about" class="site-nav-link"> About </NuxtLink>
        </li>
        <li class="site-nav-item">
          <NuxtLink v-magnetic to="/#career" class="site-nav-link"> Career </NuxtLink>
        </li>
        <li class="site-nav-item">
          <NuxtLink v-magnetic to="/#projects" class="site-nav-link"> Projects </NuxtLink>
        </li>
        <li class="site-nav-item">
          <NuxtLink v-magnetic to="/devlogs" class="site-nav-link"> Devlogs </NuxtLink>
        </li>
        <li class="site-nav-item">
          <NuxtLink v-magnetic to="/#contact" class="site-nav-link"> Contact </NuxtLink>
        </li>
      </menu>

      <!-- Mobile Hamburger Button -->
      <button
        class="z-[60] flex h-8 w-8 flex-col items-center justify-center gap-1.5 text-white md:hidden"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <span
          class="block h-[2px] w-6 bg-white transition-transform duration-300"
          :class="{ 'translate-y-[8px] rotate-45': isMenuOpen }"
        ></span>
        <span
          class="block h-[2px] w-6 bg-white transition-opacity duration-300"
          :class="{ 'opacity-0': isMenuOpen }"
        ></span>
        <span
          class="block h-[2px] w-6 bg-white transition-transform duration-300"
          :class="{ '-translate-y-[8px] -rotate-45': isMenuOpen }"
        ></span>
      </button>
    </nav>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 flex h-screen w-screen flex-col overflow-y-auto bg-[#0c0c0c]/95 px-7 pt-24 backdrop-blur-lg md:hidden"
      >
        <menu class="mt-12 mb-auto flex flex-col gap-8 text-center text-2xl font-medium" @click.stop>
          <li class="site-nav-item">
            <NuxtLink to="/#about" class="site-nav-link block" @click="closeMenu"> About </NuxtLink>
          </li>
          <li class="site-nav-item">
            <NuxtLink to="/#career" class="site-nav-link block" @click="closeMenu"> Career </NuxtLink>
          </li>
          <li class="site-nav-item">
            <NuxtLink to="/#projects" class="site-nav-link block" @click="closeMenu"> Projects </NuxtLink>
          </li>
          <li class="site-nav-item">
            <NuxtLink to="/devlogs" class="site-nav-link block" @click="closeMenu"> Devlogs </NuxtLink>
          </li>
          <li class="site-nav-item">
            <NuxtLink to="/#contact" class="site-nav-link block" @click="closeMenu"> Contact </NuxtLink>
          </li>
        </menu>
      </div>
    </transition>
  </header>
</template>

<style scoped lang="scss">
.site-nav {
  background-color: rgba(10, 10, 10, 0.5);
  backdrop-filter: blur(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    backdrop-filter 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}
</style>
