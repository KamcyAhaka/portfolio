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
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal-panel" role="dialog" aria-modal="true" :aria-label="`${project.title} details`">
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-header-meta">
            <div>
              <h2 class="modal-title">{{ project.title }}</h2>
              <p class="modal-tagline">{{ project.tagline }}</p>
            </div>
          </div>
          <div class="modal-header-actions">
            <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="modal-action-btn">
              <Icon name="octicon:link-external-16" />
              Live Site
            </a>
            <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="modal-action-btn">
              <Icon name="octicon:mark-github-16" />
              Repo
            </a>
            <button class="modal-close-btn" aria-label="Close modal" @click="emit('close')">
              <Icon name="octicon:x-16" />
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <!-- Details -->
          <section class="modal-section">
            <h3 class="modal-section-label">
              <span class="modal-section-index font-mono">01</span>
              Details
            </h3>
            <p class="modal-details-text">{{ project.details }}</p>
          </section>

          <!-- Stack -->
          <section class="modal-section">
            <h3 class="modal-section-label">
              <span class="modal-section-index font-mono">02</span>
              Stack
            </h3>
            <ul class="modal-stack-list">
              <li v-for="item in project.stack" :key="item.name" class="modal-stack-item">
                <span class="modal-stack-name">{{ item.name }}</span>
                <span class="modal-stack-role">{{ item.role }}</span>
              </li>
            </ul>
          </section>

          <!-- Key Highlights -->
          <section class="modal-section">
            <h3 class="modal-section-label">
              <span class="modal-section-index font-mono">03</span>
              Key Highlights
            </h3>
            <ul class="modal-highlights-list">
              <li v-for="highlight in project.highlights" :key="highlight" class="modal-highlight-item">
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
/* ── Overlay ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1.5rem;

  @media (min-width: 768px) {
    align-items: center;
  }
}

/* ── Panel ── */
.modal-panel {
  width: 100%;
  max-width: 680px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
}

/* ── Header ── */
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  flex-shrink: 0;
}

.modal-header-meta {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.modal-index {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.08em;
  padding-top: 4px;
}

.modal-title {
  font-family: var(--font-accent, inherit);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
}

.modal-tagline {
  font-size: 0.8rem;
  color: rgba(216, 216, 216, 0.4);
  margin-top: 4px;
  line-height: 1.5;
}

.modal-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.modal-action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.72rem;
  font-family: var(--font-accent, inherit);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.22);
    color: rgba(255, 255, 255, 0.9);
  }
}

.modal-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.85);
  }
}

/* ── Body ── */
.modal-body {
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
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

/* ── Section ── */
.modal-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal-section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-accent, inherit);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding-bottom: 10px;
}

.modal-section-index {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.08em;
}

/* Details */
.modal-details-text {
  font-size: 0.875rem;
  line-height: 1.8;
  color: rgba(216, 216, 216, 0.65);
}

/* Stack */
.modal-stack-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-stack-item {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
}

.modal-stack-name {
  font-family: var(--font-accent, inherit);
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
}

.modal-stack-role {
  font-size: 0.78rem;
  color: rgba(216, 216, 216, 0.35);
  letter-spacing: 0.03em;
}

/* Highlights */
.modal-highlights-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-highlight-item {
  font-size: 0.875rem;
  line-height: 1.8;
  color: rgba(216, 216, 216, 0.6);
  padding-left: 1rem;
  position: relative;

  &::before {
    content: "–";
    position: absolute;
    left: 0;
    color: rgba(255, 255, 255, 0.4);
  }
}
</style>
