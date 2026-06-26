<script setup lang="ts">
const startYear = 2022;
const currentYear = new Date().getFullYear();
const years = currentYear - startYear;

const activeExperience = ref<string | null>(null);
const glowPulsing = ref(false);
const experienceRef = ref<HTMLElement | null>(null);

const experiences = [
  {
    company: "Topibro Technologies",
    url: "https://www.topibrotech.com/",
    role: "Software Engineer",
    index: "01",
    time: "Jan 2025 - Present",
    activities: [
      "Delivered 10+ client-facing web applications across 5+ industries between West and East Africa, owning frontend implementation from architecture to production release",
      "Integrated frontend systems with 40+ REST and third-party APIs, including contributing to the design of internal endpoints, handling authentication flows, error states, and edge-case scenarios",
      "Improved application performance by 30% through bundle optimisation, lazy loading, and render efficiency improvements, alongside Firestore query structuring and Cloud Functions cold-start reduction",
      "Collaborated with 12+ cross-functional stakeholders (designers, backend engineers, PMs, and clients) per project.",
      "Mentored and supported 6 frontend interns, providing onboarding, code reviews, and weekly technical guidance",
      "Refactored and stabilised legacy client codebases, reducing frontend technical debt by 40%",
      "Participated in full-stack technical planning, estimation, and delivery for projects ranging from 4 to 16 weeks, contributing to backend decisions including Firestore data modelling and CI/CD pipeline setup",
    ],
  },
  {
    company: "The PATH Project",
    url: "https://payattentiontohim.org/",
    role: "Web Development Team Lead",
    index: "02",
    time: "2025 - Present",
    activities: [
      "Led technical architecture decisions for a full-stack nonprofit platform built on Nuxt 4, Firebase, and Supabase (PostgreSQL), establishing frontend standards, branching conventions, and code review processes across a volunteer engineering team",
      "Architected and implemented a role-based access control (RBAC) system with real-time privilege enforcement, securing sensitive admin functions across a multi-role admin panel",
      "Designed and delivered a scalable content pipeline with automated publishing via GitHub Actions, a TinyMCE-powered CMS, and a PostHog analytics dashboard with shareable URL state for cross-team visibility",
      "Hardened platform security by implementing Upstash Redis rate limiting on authentication endpoints and webhook-based attachment validation on inbound email flows via Resend",
      "Drove technical planning and sprint delivery across volunteer contributors, coordinating engineering, design, and content workstreams to ship features on schedule",
      "Defined and enforced frontend architecture patterns, component conventions, and deployment workflows adopted across the team",
    ],
  },
  {
    company: "Seamailer",
    url: "https://seamailer.app/",
    role: "Frontend Developer",
    index: "03",
    time: "Aug 2024 - Jan 2025",
    activities: [
      "Built a directed graph visualisation UI for the flagship automation feature, shipping 2 weeks ahead of schedule",
      "Designed a modular component system that cut feature dev time by 35% across 5+ major product areas",
      "Led frontend tooling and framework decisions, ensuring long-term scalability and maintainability",
      "Integrated with 30+ backend services and third-party APIs, ensuring reliable data flow and fault tolerance",
      "Implemented state management for 20+ async workflows with real-time updates and cross-feature data sync",
      "Built an SEO-optimised landing page with Nuxt.js, Google Analytics integration, and technical SEO best practices",
      "Contributed to the frontend architecture of a platform serving 50k+ contacts across 100+ customers",
      "Delivered mobile-first interfaces and an analytics dashboard achieving 95%+ Lighthouse accessibility scores",
    ],
  },
];

const handleScroll = () => {
  const container = experienceRef.value;
  if (!container) return;

  const elements = Array.from(container.querySelectorAll(".experience")) as HTMLElement[];
  const scrollTop = container.scrollTop;
  let activeCompany = activeExperience.value;
  let minDistance = Infinity;

  elements.forEach((el) => {
    const distance = Math.abs(el.offsetTop - scrollTop);
    if (distance < minDistance) {
      minDistance = distance;
      activeCompany = el.getAttribute("data-company");
    }
  });

  if (activeCompany && activeCompany !== activeExperience.value) {
    glowPulsing.value = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        activeExperience.value = activeCompany;
        glowPulsing.value = true;
      });
    });
  }
};

onMounted(() => {
  const container = experienceRef.value;
  if (!container) return;

  container.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  onUnmounted(() => {
    container.removeEventListener("scroll", handleScroll);
  });
});
</script>

<template>
  <section id="career" class="career-wrapper h-screen">
    <div
      class="career-section sticky top-10 flex h-[calc(100vh-2.5rem)] flex-col gap-12 py-16 pb-6 lg:h-auto lg:gap-20 lg:pt-24 xl:flex-row"
    >
      <div class="career-header flex flex-col gap-5 lg:justify-center xl:w-1/2">
        <h2
          class="font-accent text-3xl leading-[1.1] font-extrabold tracking-[0.12rem] capitalize md:text-5xl lg:text-[4rem]"
        >
          <span class="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">My</span> Career Journey
        </h2>
        <p class="career-intro max-w-[52ch] text-sm leading-[1.8] text-[rgba(216,216,216,0.6)] md:text-base lg:text-lg">
          Over {{ years }} years of building across product teams and client projects; from complex automation UIs and
          component systems to SEO-optimised platforms serving tens of thousands of users. I specialise in frontend
          engineering with Vue and Nuxt, and I care deeply about shipping software that performs as well as it looks.
        </p>
      </div>

      <div
        ref="experienceRef"
        class="experiences flex min-h-0 flex-1 flex-col overflow-scroll lg:max-h-[500px] lg:pl-10 xl:w-1/2"
        :class="{ 'experiences--lit': glowPulsing }"
      >
        <div
          v-for="experience in experiences"
          :key="experience.company"
          :data-company="experience.company"
          class="experience relative grid gap-2 py-8 md:gap-4 md:py-12"
          :class="{ 'experience--active': activeExperience === experience.company }"
        >
          <span class="experience-index pt-1 text-xs md:text-sm">{{ experience.index }}</span>
          <div class="experience-body flex flex-col gap-3">
            <h3 class="experience-role text-xl md:text-2xl">{{ experience.role }}</h3>
            <NuxtLink
              :to="experience.url"
              external
              target="_blank"
              class="experience-company text-xs font-semibold md:text-sm"
              >{{ experience.company }}</NuxtLink
            >
            <h4 class="experience-time text-xs md:text-sm">{{ experience.time }}</h4>
            <ul class="experience-activities mt-2 flex flex-col gap-3">
              <li
                v-for="activity in experience.activities"
                :key="activity"
                class="experience-activity text-sm md:text-base"
              >
                {{ activity }}
              </li>
            </ul>
          </div>
          <div class="experience-line" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Scroll snap container ── */
.experiences {
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
      rgba(169, 115, 241, 0.18) 0%,
      rgba(169, 115, 241, 0.07) 45%,
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

.experience {
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

    .experience-role {
      color: rgba(255, 255, 255, 1);
    }

    .experience-index {
      color: rgba(255, 255, 255, 0.5);
    }

    .experience-company {
      color: rgba(216, 216, 216, 0.6);
    }

    .experience-time {
      color: rgba(216, 216, 216, 0.7);
    }

    .experience-activity {
      color: rgba(216, 216, 216, 0.75);
    }
  }

  &:not(.experience--active):hover {
    &::before {
      transform: scaleY(0.4);
    }

    .experience-role {
      color: rgba(255, 255, 255, 0.95);
    }

    .experience-index {
      color: rgba(255, 255, 255, 0.35);
    }

    .experience-company {
      color: rgba(216, 216, 216, 0.5);
    }

    .experience-activity {
      color: rgba(216, 216, 216, 0.6);
    }
  }
}

.experience-index {
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  transition: color 0.25s ease;
  font-family: var(--font-mono, monospace);
}

.experience-role {
  font-family: var(--font-accent, inherit);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.25s ease;
}

.experience-company {
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(216, 216, 216, 0.4);
  transition: color 0.25s ease;
}

.experience-time {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(216, 216, 216, 0.3);
  transition: color 0.25s ease;
}

.experience-activities {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
}

.experience-activity {
  font-size: 0.875rem;
  line-height: 1.8;
  color: rgba(216, 216, 216, 0.45);
  transition: color 0.25s ease;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: "–";
    position: absolute;
    left: 0;
    color: rgba(255, 255, 255, 0.5);
  }
}

.experience-line {
  display: none;
}
</style>
