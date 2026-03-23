<script setup lang="ts">
const philosophy = ref(["Understand", "Design", "Experience"]);
</script>

<template>
  <section
    class="desktop:min-h-[60vh] desktop:pb-24 relative min-h-[60vh] pt-32 pb-12 md:min-h-[50vh] md:pt-40 lg:pt-48"
  >
    <div class="flex h-full flex-col justify-center gap-4 md:gap-6 lg:max-w-[800px] lg:gap-8">
      <div>
        <h1
          class="font-accent heading-text text-left text-3xl leading-[1.15] font-extrabold text-wrap md:text-5xl lg:text-7xl"
        >
          Building a <span class="text-highlight">web</span> worth experiencing
        </h1>
      </div>
      <div class="md:w-5/6">
        <p class="font-accent-2 heading-info text-left text-sm leading-relaxed text-[#afaeae] md:text-base lg:text-lg">
          I'm Divine "KamCy" Ahaka, a software engineer with a passion for creating applications that are
          <span class="">beautiful to look at</span>, <span class="">intuitive to use</span> and
          <span class="">gets the job done</span>.
        </p>
      </div>
      <div
        class="philosophy-tagline-container mt-2 flex flex-wrap items-center gap-2 text-sm font-medium md:gap-4 md:text-base"
      >
        <span v-for="(item, index) in philosophy" :key="index" class="philosophy flex items-center gap-2 text-white/80"
          >{{ item }}
          <template v-if="index !== philosophy.length - 1">
            <Icon name="octicon:square-fill-16" class="text-xs md:text-sm" />
          </template>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.heading-text {
  .text-highlight {
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.835);
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.835);
  }
}
</style>
