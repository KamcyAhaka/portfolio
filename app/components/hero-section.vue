<script setup lang="ts">
const philosophy = ref(["Understand", "Design", "Experience"]);
const { navigateToPillar } = usePhilosophyNav();

const handlePhilosophyClick = (word: string) => {
  navigateToPillar(word);

  const section = document.getElementById("about");
  if (!section) return;

  // Compute absolute top relative to the document (works when html is the scroll container).
  const top = section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
};
</script>

<template>
  <section
    class="desktop:min-h-[70vh] desktop:pb-24 relative min-h-[60vh] pt-32 pb-12 md:min-h-[50vh] md:pt-40 lg:pt-48"
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
      <div class="philosophy-group mt-2 flex flex-col gap-2">
        <p
          class="explore-hint flex items-center gap-1.5 text-[10px] font-medium tracking-widest text-white/35 uppercase select-none"
        >
          <Icon name="octicon:arrow-down-16" class="explore-arrow text-[9px]" />
          Explore my philosophy
        </p>
        <div
          class="philosophy-tagline-container flex flex-wrap items-center gap-2 text-sm font-medium md:gap-4 md:text-base"
        >
          <button
            v-for="(item, index) in philosophy"
            :key="index"
            type="button"
            class="philosophy flex items-center gap-2 text-white/80"
            @click="handlePhilosophyClick(item)"
          >
            {{ item }}
            <template v-if="index !== philosophy.length - 1">
              <Icon name="octicon:square-fill-16" class="text-xs md:text-sm" />
            </template>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.heading-text {
  .text-highlight {
    color: transparent;
    -webkit-text-stroke: 1px color-mix(in srgb, var(--accent-light), white 40%);
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: color-mix(in srgb, var(--accent-light), white 40%);
  }
}

/* Hint label */
.explore-arrow {
  animation: hint-nudge 3s ease-in-out infinite;
}

@keyframes hint-breathe {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes hint-nudge {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(2px);
  }
}

/* Philosophy buttons */
.philosophy {
  position: relative;
  cursor: pointer;
  transition: color 0.2s ease;

  /* Underline reveal */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover {
    color: rgba(255, 255, 255, 1);
    &::after {
      transform: scaleX(1);
    }
  }

  &:active {
    transform: scale(0.96);
  }
}
</style>
