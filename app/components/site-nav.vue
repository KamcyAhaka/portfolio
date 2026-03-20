<template>
  <header class="site-header">
    <nav class="site-nav fixed top-0 z-50 flex h-20 w-full items-center justify-between px-7">
      <NuxtLink to="/" class="site-logo"> KamCy </NuxtLink>
      <menu class="site-nav-list text-gray-2 flex items-center gap-3 text-sm">
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
