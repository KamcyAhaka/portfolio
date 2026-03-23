<template>
  <header class="site-header">
    <nav
      class="site-nav fixed top-0 z-50 flex h-20 w-screen items-center justify-between px-7 md:px-16 lg:px-24 xl:px-48"
    >
      <NuxtLink to="/" class="site-logo text-lg font-bold md:tracking-wide"> KamCy </NuxtLink>
      <menu class="site-nav-list text-gray-2 flex items-center gap-3 text-sm md:gap-8 md:text-base">
        <li class="site-nav-item">
          <NuxtLink to="#about" class="site-nav-link"> About </NuxtLink>
        </li>
        <li class="site-nav-item">
          <NuxtLink to="#career" class="site-nav-link"> Career </NuxtLink>
        </li>
        <li class="site-nav-item">
          <NuxtLink to="#projects" class="site-nav-link"> Projects </NuxtLink>
        </li>
        <li class="site-nav-item">
          <NuxtLink to="#contact" class="site-nav-link"> Contact </NuxtLink>
        </li>
      </menu>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.site-nav {
  background-color: rgba(10, 10, 10, 0.5);
  backdrop-filter: blur(10px);
}
</style>
