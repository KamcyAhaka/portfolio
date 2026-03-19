<script setup lang="ts">
const startYear = 2022;
const currentYear = new Date().getFullYear();
const years = currentYear - startYear;
</script>

<template>
  <section class="career-section sticky top-0 flex flex-col gap-12 py-16">
    <div class="career-header flex flex-col gap-5">
      <h2 class="career-title">
        My Career
        <span class="career-title--outline">Journey</span>
      </h2>
      <p class="career-intro text-sm">
        I’ve been building software for over {{ years }} years. I’ve seen languages rise and fall, frameworks come and
        go, and the industry change in ways I never expected. But through it all, one thing has remained constant: my
        passion for building great software.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.career-title {
  font-family: var(--font-accent, inherit);
  font-size: clamp(1.75rem, 6vw, 2.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 0.12rem;
  text-transform: capitalize;

  &--outline {
    display: block;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
  }
}

.career-intro {
  line-height: 1.8;
  color: rgba(216, 216, 216, 0.6);
  max-width: 52ch;
}
</style>
