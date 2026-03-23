<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import type { Project } from "~/types/project";

const activeProject = ref<Project | null>(null);
const sectionRef = ref<HTMLElement | null>(null);
const glowPulsing = ref(false);
const hasDragged = ref(false);

const projects: Project[] = [
  {
    index: "01",
    title: "Pay Attention To Him",
    tagline: "Ministry website with media and event management",
    tags: ["Nuxt", "Vue", "Prisma", "PostgreSQL"],
    url: "https://payattentiontohim.org/",
    details:
      "A full-featured ministry website built to host sermons, events, and devotional content for a growing faith community. The platform supports dynamic content management, media streaming references, and an accessible design that works for users of all technical backgrounds.",
    stack: [
      { name: "Nuxt 3", role: "SSR framework & routing" },
      { name: "Vue 3", role: "UI composition & reactivity" },
      { name: "Prisma ORM", role: "Database access layer" },
      { name: "PostgreSQL", role: "Primary database" },
    ],
    highlights: [
      "Dynamic sermon and event management with a custom CMS interface",
      "Accessible design meeting WCAG 2.1 AA standards",
      "SEO-optimised pages with Open Graph metadata for social sharing",
      "Optimised for low-bandwidth environments serving a global audience",
    ],
  },
  {
    index: "02",
    title: "Ugochukwu Osuagwu",
    tagline: "Personal portfolio for a communications professional",
    tags: ["Nuxt", "Vue", "TypeScript", "SCSS"],
    url: "https://ugochukwuosuagwu.com/",
    details:
      "A sleek, modern personal portfolio designed and built for Ugochukwu Osuagwu. The site showcases his professional background, skills, and experience with a clean, minimal aesthetic. Every section was crafted to make a strong first impression while keeping the focus on content and readability.",
    stack: [
      { name: "Nuxt 3", role: "SSR framework & routing" },
      { name: "Vue 3", role: "UI composition & reactivity" },
      { name: "TypeScript", role: "Type safety" },
      { name: "SCSS", role: "Custom styling & animations" },
    ],
    highlights: [
      "Implemented smooth page transitions and scroll-driven animations",
      "Achieved 95+ Lighthouse performance score across all categories",
      "Fully responsive layout optimised for mobile, tablet, and desktop",
      "SEO-optimised with structured metadata and semantic HTML",
    ],
  },
  {
    index: "03",
    title: "Judith Amarachi",
    tagline: "Personal brand site for a creative professional",
    tags: ["Nuxt", "Vue", "Tailwind", "GSAP"],
    url: "https://judithamarachi.com/",
    details:
      "A personal brand website for Judith Amarachi, designed to express her personality and professional identity. The site balances warmth and elegance, featuring smooth animations, carefully chosen typography, and a layout that draws visitors in and keeps them engaged.",
    stack: [
      { name: "Nuxt 3", role: "SSR framework & routing" },
      { name: "Vue 3", role: "UI composition" },
      { name: "Tailwind CSS", role: "Utility-first styling" },
      { name: "GSAP", role: "Entrance and scroll animations" },
    ],
    highlights: [
      "Custom GSAP scroll-triggered animations for every major section",
      "Brand-consistent color palette and typography system",
      "Optimised asset delivery with lazy loading and image compression",
      "Integrated contact form with server-side email handling",
    ],
  },

  {
    index: "04",
    title: "Judith Amarachi Blog",
    tagline: "A personal writing space with a rich reading experience",
    tags: ["Nuxt", "Content", "Markdown", "TypeScript"],
    url: "https://blog.judithamarachi.com/",
    details:
      "A personal blog extension of the Judith Amarachi brand, built for long-form writing and storytelling. The platform prioritises reading comfort with carefully tuned typography, generous whitespace, and a distraction-free layout that lets the content breathe.",
    stack: [
      { name: "Nuxt Content", role: "Markdown-based content layer" },
      { name: "Vue 3", role: "UI components" },
      { name: "TypeScript", role: "Type safety across the codebase" },
      { name: "SCSS", role: "Custom reading typography styles" },
    ],
    highlights: [
      "Nuxt Content v2 with Markdown + MDC for rich, structured posts",
      "Custom reading-optimised typography with fluid type scaling",
      "Generated sitemap and RSS feed for discoverability",
      "Dark/light mode with system-preference detection",
    ],
  },
];

function openModal(project: Project) {
  activeProject.value = project;
}

const swiperInstance = ref<SwiperType | null>(null);

function onSwiper(swiper: SwiperType) {
  swiperInstance.value = swiper;
}

function onSwipeLeft() {
  swiperInstance.value?.slideNext(300);
}

function onSwipeRight() {
  swiperInstance.value?.slidePrev(300);
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          glowPulsing.value = false;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              glowPulsing.value = true;
            });
          });
        } else {
          glowPulsing.value = false;
        }
      });
    },
    { threshold: 0.1 },
  );

  if (sectionRef.value) observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <section id="projects" class="projects-wrapper" style="height: 100vh; overflow-x: clip">
    <div
      ref="sectionRef"
      class="projects-section sticky top-10 flex h-[calc(100vh-2.5rem)] flex-col gap-10 py-16 pb-6"
      :class="{ 'projects-section--lit': glowPulsing }"
    >
      <!-- Header -->
      <div class="projects-header flex flex-col gap-5">
        <h2 class="projects-title"><span class="projects-title--outline">Featured</span> Projects</h2>
        <p class="projects-intro text-sm">
          A selection of client projects I've designed and engineered end-to-end — from architecture decisions and
          component systems to final deployment. Each embedded below so you can explore them right here.
        </p>
      </div>

      <!-- Swiper carousel -->
      <ClientOnly>
        <div class="relative flex min-h-0 flex-1 flex-col">
          <Swiper
            slides-per-view="auto"
            :space-between="20"
            :grab-cursor="true"
            :centered-slides="true"
            :round-lengths="true"
            class="projects-swiper min-h-0 w-full flex-1"
            @swiper="onSwiper"
            @slider-move="hasDragged = true"
          >
            <SwiperSlide v-for="project in projects" :key="project.index" class="projects-slide">
              <ProjectCard
                :project="project"
                @open-modal="openModal(project)"
                @swipe-left="onSwipeLeft"
                @swipe-right="onSwipeRight"
              />
            </SwiperSlide>
          </Swiper>

          <!-- Right fade edge -->
          <div
            class="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-r from-transparent to-[#0e0e0eb0]"
          />

          <!-- Drag hint — fades out after first interaction -->
          <div class="mt-3 flex items-center gap-1.5">
            <Icon name="octicon:arrow-right-16" class="text-xs text-white/30" />
            <span class="text-[0.68rem] tracking-[0.06em] text-white/50"> drag the top bar to explore </span>
          </div>
        </div>
      </ClientOnly>
    </div>

    <!-- Modal — ProjectModal handles its own Teleport to body -->
    <Transition name="modal">
      <ProjectModal v-if="activeProject" :project="activeProject" @close="activeProject = null" />
    </Transition>
  </section>
</template>

<style lang="scss" scoped>
.projects-title {
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

.projects-intro {
  line-height: 1.8;
  color: rgba(216, 216, 216, 0.6);
  max-width: 55ch;
}

/* ── Glow effect ── */
.projects-section {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: radial-gradient(
      ellipse 75% 160% at 50% -20%,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.07) 45%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 0;
  }

  &--lit::before {
    opacity: 1;
  }
}

/* ── Swiper overrides ── */
/*
  Do NOT use overflow:visible — it causes the slides to bleed
  outside the section and creates a horizontal scrollbar that
  breaks sticky positioning and scroll-snap for ALL sections.
*/
.projects-swiper {
  overflow: hidden;
}

:deep(.swiper-wrapper) {
  align-items: stretch;
  height: 100%;
}

.projects-slide {
  width: 350px !important;
  height: 100%;
}

/* ── Transitions ── */
.modal-enter-active {
  transition:
    opacity 0.25s ease,
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.modal-enter-from {
  opacity: 0;

  .modal-panel {
    transform: translateY(24px);
  }
}

.modal-leave-to {
  opacity: 0;

  .modal-panel {
    transform: translateY(12px);
  }
}
</style>
