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
    index: "01", // adjust to your ordering
    title: "Logrithm",
    tagline: "AI-powered GitHub activity analyzer and developer scoring platform",
    tags: ["Next.js", "TypeScript", "Firebase", "GCP", "Gemini AI"],
    url: "https://logrithm.dev/",
    details:
      "A full-stack SaaS platform that analyzes GitHub activity and generates a deterministic developer score across five dimensions using Gemini 2.5 Flash. Built with an open core model, featuring public leaderboards, shareable profile pages, a GitHub README badge system, and Pro plan gating, engineered for scale on GCP with a serverless-first architecture.",
    stack: [
      { name: "Next.js 16", role: "SSR framework & routing" },
      { name: "TypeScript", role: "Type safety across the codebase" },
      { name: "Firebase & Firestore", role: "Authentication, database & custom token auth" },
      { name: "Cloud Functions Gen 2", role: "Serverless backend & scheduled jobs" },
      { name: "Gemini 2.5 Flash", role: "AI-powered activity analysis & scoring" },
      { name: "GCP Secret Manager", role: "Secure credentials management" },
      { name: "LemonSqueezy", role: "Pro plan payments & webhook handling" },
      { name: "Tailwind CSS v4 & ShadCN", role: "UI design system" },
    ],
    highlights: [
      "Architected a serverless full-stack SaaS on GCP using Next.js 16, Firestore, and Cloud Functions Gen 2, establishing a clean separation between data ingestion, scoring, and presentation layers with GCP Secret Manager handling secure credential storage across environments",
      "Designed and implemented a deterministic 5-dimension scoring engine powered by Gemini 2.5 Flash, processing raw GitHub activity data into a reproducible, structured developer performance score with consistent output across repeated analyses",
      "Built a Pro plan monetisation layer using LemonSqueezy with webhook-based purchase verification, Firestore-enforced feature access control, and Firebase custom tokens powering a beta tester routing system that bypasses standard gating for early access users",
      "Implemented GitHub OAuth with Firebase Authentication, managing token exchange, session persistence, and scoped API access to the GitHub REST API for per-user activity ingestion",
      "Built public-facing profile pages and an anonymous leaderboard with Firestore-backed real-time ranking, alongside a dynamically generated GitHub README badge system designed to drive organic platform discovery",
      "Adopted an AGPL-3.0 open core licensing model, structuring the codebase to expose the core analyzer publicly while keeping Pro features proprietary, balancing community contribution with commercial sustainability",
    ],
  },
  {
    index: "02", // adjust to whatever index it falls on
    title: "The PATH Project",
    tagline: "Youth advocacy platform for young males across Africa",
    tags: ["Nuxt", "Vue", "TypeScript", "Firebase", "Supabase"],
    url: "https://payattentiontohim.org/",
    details:
      "A full-stack nonprofit platform built to amplify advocacy for young males across Africa. The PATH Project hosts editorial content, community initiatives, and writing competitions, engineered for scale, accessibility, and editorial flexibility. Built and maintained as Web Development Team Lead, driving both technical architecture and cross-functional delivery.",
    stack: [
      { name: "Nuxt 3", role: "SSR framework & static generation" },
      { name: "Vue 3", role: "UI composition & interaction logic" },
      { name: "TypeScript", role: "Type safety across the codebase" },
      { name: "Firebase", role: "Authentication & Firestore database" },
      { name: "Supabase", role: "Media & asset storage" },
      { name: "Resend", role: "Transactional email & webhook handling" },
    ],
    highlights: [
      "Architected a full-stack blog platform with Nuxt 4, Firebase, and Supabase (PostgreSQL), implementing role-based access control (RBAC) to protect sensitive admin functions",
      "Built a multi-role admin panel with user management, post drafts, categories and tags management, and a PostHog-powered analytics dashboard with shareable URL state via query parameters",
      "Implemented an automated content publishing pipeline using GitHub Actions, enabling scheduled post releases with zero manual intervention",
      "Integrated real-time role enforcement that immediately revokes access on privilege changes, and rate limiting on auth endpoints via Upstash Redis to prevent brute-force attacks",
    ],
  },
  {
    index: "03",
    title: "Ugochukwu Osuagwu",
    tagline: "Personal portfolio for a UI/UX designer",
    tags: ["Nuxt", "Vue", "TypeScript", "SCSS"],
    url: "https://ugochukwuosuagwu.com/",
    details:
      "A custom responsive web portfolio designed and developed for Ugochukwu Osuagwu, a UI/UX designer. The platform highlights his design achievements, visual case studies, and user experience expertise. It is built to make a strong first impression, featuring SEO enhancements to boost search visibility and analytics tracking to monitor traffic.",
    stack: [
      { name: "Nuxt 3", role: "SSR framework & static generation" },
      { name: "Vue 3", role: "UI composition & interaction logic" },
      { name: "TypeScript", role: "Type safety across the codebase" },
      { name: "SCSS", role: "Custom styling & animations" },
    ],
    highlights: [
      "Designed and developed a custom responsive web portfolio for Ugochukwu Osuagwu, a UI/UX designer, showcasing professional achievements and expertise",
      "Implemented smooth page transitions and scroll-driven animations",
      "Enhanced site performance with SEO optimisation techniques, improving visibility in search results",
      "Integrated Google Analytics and Google Search Console to measure and analyse site traffic",
    ],
  },
  {
    index: "04",
    title: "Judith Amarachi",
    tagline: "Personal portfolio for a tech sales expert",
    tags: ["Nuxt", "Vue", "Tailwind"],
    url: "https://judithamarachi.com/",
    details:
      "A fully responsive and high-performance personal portfolio built for Judith Amarachi, a tech sales expert. Developed in accordance with precise design specifications, the platform highlights her industry expertise, career achievements, and professional value. The site balances premium typography, smooth animations, and optimized load times to exceed client expectations.",
    stack: [
      { name: "Nuxt 3", role: "SSR framework & static site hosting" },
      { name: "Vue 3", role: "Interactive frontend components" },
      { name: "Tailwind CSS", role: "Responsive interface styling" },
    ],
    highlights: [
      "Built and hosted a responsive web portfolio for Judith Amarachi, a tech sales expert",
      "Developed the portfolio in accordance with the design specifications, exceeding client expectations",
      "Optimised blog performance by 40% to improve search engine rankings",
    ],
  },

  {
    index: "05",
    title: "Judith Amarachi Blog",
    tagline: "Full-stack blog platform with role-based access control and automation",
    tags: ["Nuxt", "Firebase", "Appwrite", "TinyMCE"],
    url: "https://blog.judithamarachi.com/",
    details:
      "A secure, full-stack blog platform and custom content management system (CMS) architected using Nuxt.js, Firebase, and Appwrite. The platform features role-based access control (RBAC), automated post scheduling and publishing workflows powered by GitHub Actions, and a multi-role admin panel for efficient content and user administration.",
    stack: [
      { name: "Nuxt 3", role: "Frontend framework & SSR" },
      { name: "Firebase & Appwrite", role: "Backend services, DB & authentication" },
      { name: "TinyMCE", role: "Rich-text WYSIWYG editor integration" },
      { name: "GitHub Actions", role: "Automated content publishing workflows" },
    ],
    highlights: [
      "Architected a full-stack blog platform using Nuxt.js, Firebase, and Appwrite with role-based access control (RBAC) protecting sensitive admin functions",
      "Implemented an automated content publishing system using GitHub Actions, enabling scheduled post releases with zero manual intervention",
      "Built a comprehensive CMS with TinyMCE integration, allowing non-technical users to create and manage content efficiently",
      "Created a multi-role admin panel with features for user management, post drafts, categories/tags management, and analytics dashboard",
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
      class="projects-section sticky top-10 flex h-[calc(100vh-2.5rem)] flex-col gap-10 py-16 pb-6 lg:gap-16 lg:pt-24 xl:flex-row"
      :class="{ 'projects-section--lit': glowPulsing }"
    >
      <!-- Header -->
      <div class="projects-header flex flex-col gap-5 lg:justify-center xl:w-1/3">
        <h2
          class="font-accent text-3xl leading-[1.1] font-extrabold tracking-[0.12rem] capitalize md:text-5xl lg:text-[4rem]"
        >
          <span class="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">Featured</span> Projects
        </h2>
        <p
          class="projects-intro max-w-[55ch] text-sm leading-[1.8] text-[rgba(216,216,216,0.6)] md:text-base lg:text-lg"
        >
          A selection of client projects I've designed and engineered end-to-end, from architecture decisions and
          component systems to final deployment. Each embedded <span class="desktop:hidden"> below </span>
          <span class="desktop:inline hidden">to the side</span> so you can explore them right here.
        </p>
      </div>

      <!-- Swiper carousel -->
      <ClientOnly>
        <div class="desktop:pl-20 relative flex min-h-0 flex-1 flex-col overflow-x-clip lg:justify-center xl:w-2/3">
          <Swiper
            slides-per-view="auto"
            :space-between="20"
            :grab-cursor="true"
            :centered-slides="false"
            :centered-slides-bounds="true"
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
            class="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-linear-to-r from-transparent to-[#0e0e0eb0]"
          />

          <!-- Drag hint - fades out after first interaction -->
          <div class="mt-3 flex items-center gap-1.5">
            <Icon name="octicon:arrow-right-16" class="text-xs text-white/30" />
            <span class="text-[0.68rem] tracking-[0.06em] text-white/50"> drag the top bar to explore </span>
          </div>
        </div>
      </ClientOnly>
    </div>

    <!-- Modal: ProjectModal handles its own Teleport to body -->
    <Transition name="modal">
      <ProjectModal v-if="activeProject" :project="activeProject" @close="activeProject = null" />
    </Transition>
  </section>
</template>

<style lang="scss" scoped>
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
      rgba(169, 115, 241, 0.18) 0%,
      rgba(169, 115, 241, 0.07) 45%,
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
  Do NOT use overflow:visible; it causes the slides to bleed
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
