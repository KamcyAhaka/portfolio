<script setup lang="ts">
const pillars = [
  {
    word: "Understand",
    index: "01",
    body: "I start by diving deep into the problem space — the user's needs, goals, and pain points. No assumptions, no shortcuts. Good software starts with the right questions.",
  },
  {
    word: "Design",
    index: "02",
    body: "Every decision is intentional — from architecture to interaction. Design isn't decoration; it's the structure that makes complexity feel simple.",
  },
  {
    word: "Experience",
    index: "03",
    body: "The measure of good software is how it feels to use. Fast, intuitive, delightful. Every line of code should contribute to that feeling. That's the bar I hold myself to.",
  },
];

const activePillar = ref<string | null>(null);
const glowPulsing = ref(false);
const pillarsRef = ref<HTMLElement | null>(null);
const pillarRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const word = entry.target.getAttribute("data-word");
          if (word === activePillar.value) return;

          glowPulsing.value = false;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              activePillar.value = word;
              glowPulsing.value = true;
            });
          });
        }
      });
    },
    {
      root: pillarsRef.value,
      rootMargin: "0px 0px -80% 0px",
      threshold: 0,
    },
  );

  pillarRefs.value.forEach((el) => observer.observe(el));

  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <section id="about" class="philosophy-wrapper" style="height: 100vh">
    <div class="philosophy-section sticky top-10 flex h-[calc(100vh-2.5rem)] flex-col gap-12 pt-16 pb-4">
      <div class="philosophy-header flex flex-col gap-5">
        <h2 class="philosophy-title"><span class="philosophy-title--outline">My</span> Engineering Philosophy</h2>
        <p class="philosophy-intro text-sm">
          I believe that software should be more than just functional; it should be a joy to use. Every line of code,
          every design decision, every interaction should be intentional and contribute to a seamless and delightful
          user experience.
        </p>
      </div>

      <div
        ref="pillarsRef"
        class="pillars flex min-h-0 flex-1 flex-col overflow-scroll"
        :class="{ 'pillars--lit': glowPulsing }"
      >
        <div
          v-for="pillar in pillars"
          :key="pillar.word"
          :ref="
            (el) => {
              if (el) pillarRefs.push(el as HTMLElement);
            }
          "
          :data-word="pillar.word"
          class="pillar relative grid gap-2 py-7"
          :class="{ 'pillar--active': activePillar === pillar.word }"
        >
          <span class="pillar-index pt-1 text-xs">{{ pillar.index }}</span>
          <div class="pillar-body flex flex-col gap-2">
            <h3 class="pillar-word">{{ pillar.word }}</h3>
            <p class="pillar-text">{{ pillar.body }}</p>
          </div>
          <div class="pillar-line" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.philosophy-title {
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

.philosophy-intro {
  line-height: 1.8;
  color: rgba(216, 216, 216, 0.6);
  max-width: 52ch;
}

/* ── Scroll snap container ── */
.pillars {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 99px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  position: relative;
  &::before {
    content: "";
    position: sticky;
    top: 0;
    display: block;
    flex-shrink: 0;
    width: 100%;
    height: 100px;
    margin-bottom: -100px;
    background: radial-gradient(
      ellipse 75% 160% at 50% -20%,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.07) 45%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 1;
  }

  &--lit::before {
    opacity: 1;
  }
}

.pillar {
  grid-template-columns: 2rem 1fr;
  cursor: default;

  scroll-snap-align: start;
  scroll-snap-stop: always;

  border-top: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }

  &::before {
    content: "";
    position: absolute;
    left: -1.5rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.7);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.35s ease;
  }

  &--active {
    &::before {
      transform: scaleY(1);
    }

    .pillar-word {
      color: rgba(255, 255, 255, 1);
    }

    .pillar-index {
      color: rgba(255, 255, 255, 0.5);
    }

    .pillar-text {
      color: rgba(216, 216, 216, 0.75);
    }
  }

  &:not(.pillar--active):hover {
    &::before {
      transform: scaleY(0.4);
    }

    .pillar-word {
      color: rgba(255, 255, 255, 0.95);
    }

    .pillar-index {
      color: rgba(255, 255, 255, 0.35);
    }

    .pillar-text {
      color: rgba(216, 216, 216, 0.6);
    }
  }
}

.pillar-index {
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  transition: color 0.25s ease;
  font-family: var(--font-mono, monospace);
}

.pillar-word {
  font-family: var(--font-accent, inherit);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.25s ease;
}

.pillar-text {
  font-size: 0.875rem;
  line-height: 1.8;
  color: rgba(216, 216, 216, 0.45);
  transition: color 0.25s ease;
}

.pillar-line {
  display: none;
}
</style>
