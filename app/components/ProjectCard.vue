<script setup lang="ts">
import type { Project } from "~/types/project";

const props = defineProps<{ project: Project }>();
const emit = defineEmits<{
  "open-modal": [];
  "swipe-left": [];
  "swipe-right": [];
}>();

const iframeRef = ref<HTMLIFrameElement | null>(null);
const iframeLoaded = ref(false);
const iframeFailed = ref(false);

const { overlayActive, onPointerDown, onPointerMove, onPointerUp, onPointerCancel } = useIframeDrag(
  () => emit("swipe-left"),
  () => emit("swipe-right"),
);

const displayUrl = computed(() => {
  try {
    return new URL(props.project.url).hostname;
  } catch {
    return props.project.url;
  }
});

function onLoad() {
  iframeLoaded.value = true;
}

function onError() {
  iframeFailed.value = true;
}
</script>

<template>
  <div
    class="flex h-full w-[350px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0e0e0e] transition-colors duration-200 ease-in-out hover:border-white/[0.18]"
  >
    <!-- Browser-chrome top bar -->
    <div
      class="flex shrink-0 cursor-grab items-center gap-2.5 border-b border-white/[0.07] bg-[#141414] px-3.5 py-2.5 transition-colors duration-200 hover:bg-white/[0.06] active:cursor-grabbing"
    >
      <span class="shrink-0 font-mono text-[0.7rem] tracking-[0.08em] text-white/30">
        {{ project.index }}
      </span>

      <div class="flex min-w-0 flex-1 flex-col gap-px">
        <span
          class="font-accent overflow-hidden text-[0.8rem] font-bold tracking-[0.04em] text-ellipsis whitespace-nowrap text-white/85"
        >
          {{ project.title }}
        </span>
        <span
          class="flex items-center gap-1 overflow-hidden text-[0.68rem] tracking-[0.03em] text-ellipsis whitespace-nowrap text-[#d8d8d8]/35"
        >
          <Icon name="octicon:globe-16" class="shrink-0 opacity-50" />
          {{ displayUrl }}
        </span>
      </div>

      <button
        class="font-accent flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.04em] text-white/65 transition-all duration-200 ease-in-out hover:border-white/25 hover:bg-white/10 hover:text-white/95"
        @click="emit('open-modal')"
      >
        <Icon name="octicon:info-16" />
        Details
      </button>
    </div>

    <!-- Frame body -->
    <div class="relative min-h-0 flex-1 overflow-hidden bg-white">
      <!-- Loading skeleton -->
      <Transition name="fade">
        <div v-if="!iframeLoaded && !iframeFailed" class="absolute inset-0 flex flex-col gap-3 bg-[#0e0e0e] p-5">
          <div class="shimmer h-3 w-3/4 rounded-full bg-white/[0.06]" />
          <div class="shimmer h-3 w-[45%] rounded-full bg-white/[0.06] [animation-delay:0.1s]" />
          <div class="shimmer flex-1 rounded-lg bg-white/[0.04] [animation-delay:0.3s]" />
        </div>
      </Transition>

      <!-- Fallback for network errors -->
      <div v-if="iframeFailed" class="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-[#0e0e0e]">
        <Icon name="octicon:alert-16" class="text-2xl text-white/20" />
        <p class="text-[0.8rem] text-[#d8d8d8]/35">Preview unavailable</p>
        <a
          :href="project.url"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1 border-b border-white/20 pb-px text-[0.78rem] text-white/55 no-underline transition-colors duration-200 hover:text-white/90"
        >
          Open site <Icon name="octicon:arrow-up-right-16" />
        </a>
      </div>

      <!-- Live iframe -->
      <iframe
        v-show="iframeLoaded && !iframeFailed"
        ref="iframeRef"
        :src="project.url"
        :title="`Preview of ${project.title}`"
        class="card-iframe"
        @load="onLoad"
        @error="onError"
      />

      <div
        v-if="iframeLoaded && !iframeFailed"
        class="absolute inset-0 z-10 touch-none"
        :style="{ pointerEvents: overlayActive ? 'auto' : 'none' }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
      />
    </div>
  </div>
</template>

<style scoped>
.card-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 1280px;
  /* The height is calculated as height = (1280 / cardWidth) * 100 + '%' */
  height: 366%;
  border: none;
  /* The scale factor is calculated as scale = cardWidth / 1280 */
  transform: scale(0.2734);
  transform-origin: top left;
  pointer-events: all;
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.shimmer {
  animation: shimmer 1.6s ease infinite;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
