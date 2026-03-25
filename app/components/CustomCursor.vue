<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useMouse } from "~/composables/useMouse";

const { x, y } = useMouse();

// Smooth cursor coordinates
const cursorX = ref(0);
const cursorY = ref(0);
const isHovering = ref(false);

let animationFrameId: number;

const lerp = (start: number, end: number, amt: number) => {
  return (1 - amt) * start + amt * end;
};

const render = () => {
  // Lerp towards actual mouse position
  cursorX.value = lerp(cursorX.value, x.value, 0.2);
  cursorY.value = lerp(cursorY.value, y.value, 0.2);
  animationFrameId = requestAnimationFrame(render);
};

const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target?.closest("a, button, input, textarea, select, .interactive, [v-magnetic]")) {
    isHovering.value = true;
  }
};

const handleMouseOut = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const interactiveEl = target?.closest("a, button, input, textarea, select, .interactive, [v-magnetic]");
  if (interactiveEl) {
    const related = e.relatedTarget as HTMLElement;
    // Only remove the hover state if the mouse is actually leaving the entire interactive element
    if (!related || !interactiveEl.contains(related)) {
      isHovering.value = false;
    }
  }
};

onMounted(() => {
  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);
  animationFrameId = requestAnimationFrame(render);
});

onUnmounted(() => {
  document.removeEventListener("mouseover", handleMouseOver);
  document.removeEventListener("mouseout", handleMouseOut);
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <div
    class="custom-cursor pointer-events-none fixed top-0 left-0 z-9999 hidden h-5 w-5 rounded-full border border-[#e8e8e8] bg-transparent mix-blend-difference will-change-transform md:block"
    :class="{ 'is-hovering': isHovering }"
    :style="{ transform: `translate3d(${cursorX}px, ${cursorY}px, 0)` }"
  ></div>
</template>

<style scoped>
.custom-cursor {
  transform: translate3d(-50%, -50%, 0);
  transition:
    width 0.3s ease,
    height 0.3s ease,
    background-color 0.3s ease,
    mix-blend-mode 0.3s ease;
}

/* Compensate for offset */
.custom-cursor {
  margin-top: -10px;
  margin-left: -10px;
}

.custom-cursor.is-hovering {
  width: 50px;
  height: 50px;
  margin-top: -25px;
  margin-left: -25px;
  background-color: #e8e8e8;
  mix-blend-mode: difference;
  border: none;
}
</style>
