<script setup lang="ts">
import type { Project } from "~/types/project";

defineProps<{ project: Project }>();

const emit = defineEmits<{ close: [] }>();

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") emit("close");
}

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-6 backdrop-blur-[10px] md:items-center"
      @click.self="emit('close')"
    >
      <div
        class="flex max-h-[88vh] w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] lg:max-w-[800px]"
        role="dialog"
        aria-modal="true"
        :aria-label="`${project.title} details`"
      >
        <!-- Header -->
        <div class="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.07] px-6 py-5">
          <div class="flex items-start gap-3.5">
            <div>
              <h2
                class="font-accent text-[1.15rem] leading-[1.2] font-extrabold tracking-[0.05em] text-white/90 md:text-xl lg:text-2xl"
              >
                {{ project.title }}
              </h2>
              <p class="mt-1 text-[0.8rem] leading-[1.5] text-[rgba(216,216,216,0.4)] md:text-sm">
                {{ project.tagline }}
              </p>
            </div>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener"
              class="font-accent flex cursor-pointer items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.04em] text-white/[0.55] no-underline transition-all duration-200 hover:border-white/[0.22] hover:bg-white/10 hover:text-white/90"
            >
              <Icon name="octicon:link-external-16" />
              Live Site
            </a>
            <a
              v-if="project.repo"
              :href="project.repo"
              target="_blank"
              rel="noopener"
              class="font-accent flex cursor-pointer items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.04em] text-white/[0.55] no-underline transition-all duration-200 hover:border-white/[0.22] hover:bg-white/10 hover:text-white/90"
            >
              <Icon name="octicon:mark-github-16" />
              Repo
            </a>
            <button
              class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/[0.08] bg-transparent text-white/40 transition-all duration-200 hover:bg-white/[0.08] hover:text-white/85"
              aria-label="Close modal"
              @click="emit('close')"
            >
              <Icon name="octicon:x-16" />
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="scrollbar-thin scrollbar-thumb-white/15 flex flex-col gap-8 overflow-y-auto p-6">
          <!-- Details -->
          <section class="flex flex-col gap-3.5">
            <h3
              class="font-accent flex items-center gap-2.5 border-b border-white/[0.07] pb-2.5 text-xs font-bold tracking-[0.12em] text-white/45 uppercase"
            >
              <span class="font-mono text-[0.65rem] tracking-[0.08em] text-white/20">01</span>
              Details
            </h3>
            <p class="text-sm leading-[1.8] text-[rgba(216,216,216,0.65)] md:text-base">{{ project.details }}</p>
          </section>

          <!-- Stack -->
          <section class="flex flex-col gap-3.5">
            <h3
              class="font-accent flex items-center gap-2.5 border-b border-white/[0.07] pb-2.5 text-xs font-bold tracking-[0.12em] text-white/45 uppercase"
            >
              <span class="font-mono text-[0.65rem] tracking-[0.08em] text-white/20">02</span>
              Stack
            </h3>
            <ul class="m-0 flex list-none flex-col p-0">
              <li
                v-for="item in project.stack"
                :key="item.name"
                class="flex items-baseline justify-between border-b border-white/[0.05] py-2.5 last:border-b-0"
              >
                <span class="font-accent text-[0.85rem] font-semibold text-white/75 md:text-sm">{{ item.name }}</span>
                <span class="text-[0.78rem] tracking-[0.03em] text-[rgba(216,216,216,0.35)] md:text-xs">{{
                  item.role
                }}</span>
              </li>
            </ul>
          </section>

          <!-- Key Highlights -->
          <section class="flex flex-col gap-3.5">
            <h3
              class="font-accent flex items-center gap-2.5 border-b border-white/[0.07] pb-2.5 text-xs font-bold tracking-[0.12em] text-white/45 uppercase"
            >
              <span class="font-mono text-[0.65rem] tracking-[0.08em] text-white/20">03</span>
              Key Highlights
            </h3>
            <ul class="m-0 flex list-none flex-col gap-2.5 p-0">
              <li
                v-for="highlight in project.highlights"
                :key="highlight"
                class="relative pl-4 text-sm leading-[1.8] text-[rgba(216,216,216,0.6)] before:absolute before:left-0 before:text-white/40 before:content-['–'] md:text-base"
              >
                {{ highlight }}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
/* Scrollbar styles for the body since Tailwind scrollbar plugin might not be installed */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.15) transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 99px;
  }
}
</style>
