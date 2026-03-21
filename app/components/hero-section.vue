<script setup lang="ts">
const philosophy = ref(["Understand", "Design", "Experience"]);
</script>

<template>
  <section class="relative h-[60vh] pt-32">
    <div class="flex h-full flex-col justify-center gap-4">
      <div>
        <h1 class="font-accent heading-text text-left text-7xl text-wrap">
          Building a <span class="text-highlight">web</span> worth experiencing
        </h1>
      </div>
      <div>
        <p class="font-accent-2 heading-info text-left text-sm">
          I'm Divine "KamCy" Ahaka, a software engineer with a passion for creating applications that are
          <span class="">beautiful to look at</span>, <span class="">intuitive to use</span> and
          <span class="">gets the job done</span>.
        </p>
      </div>
      <div class="philosophy-tagline-container flex items-center gap-2 text-sm font-medium">
        <span v-for="(item, index) in philosophy" :key="index" class="philosophy flex items-center gap-2"
          >{{ item }}
          <template v-if="index !== philosophy.length - 1">
            <Icon name="octicon:square-fill-16" />
          </template>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.heading-text {
  font-weight: 800;
  font-size: clamp(32px, 3vw + 1rem, 64px);
  line-height: 1.15;

  .text-highlight {
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.835);
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.835);
  }
}

.heading-info {
  color: #afaeae;
  line-height: 1.5;
}

.philosophy-tagline-container {
  .philosophy {
    color: rgba(216, 216, 216, 0.845);
  }
}
</style>
