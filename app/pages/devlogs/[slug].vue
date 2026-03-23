<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => queryCollection("devlogs").path(route.path).first());

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Devlog not found", fatal: true });
}

useSeoMeta({
  title: page.value?.title ? `${page.value.title} | KamCy` : "KamCy",
  description: page.value?.description,
});
</script>

<template>
  <SiteNav />
  <main class="min-h-screen px-7 pt-32 pb-24 md:px-16 lg:px-24 xl:px-48">
    <article class="mx-auto max-w-3xl">
      <NuxtLink
        to="/devlogs"
        class="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
      >
        <span aria-hidden="true">&larr;</span> Back to Devlogs
      </NuxtLink>

      <div class="mb-12">
        <div v-if="page?.date" class="mb-4 text-sm text-gray-400">
          <time :datetime="page.date">
            {{ new Date(page.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }}
          </time>
        </div>
        <h1 class="mb-6 text-4xl font-bold md:text-5xl md:tracking-wide">
          {{ page?.title }}
        </h1>
        <p v-if="page?.description" class="text-xl text-gray-300">
          {{ page?.description }}
        </p>
      </div>

      <!-- Applying basic typography styles using Tailwind prose-like utilities -->
      <div class="prose prose-invert prose-lg max-w-none">
        <ContentRenderer v-if="page" :value="page" class="space-y-6" />
      </div>
    </article>
  </main>
</template>

<style>
/* Scoped some basic typography styles to complement the ContentRenderer output since we might not have @tailwindcss/typography installed */
.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
  color: #fff;
}
.prose h2 {
  font-size: 1.875rem;
}
.prose h3 {
  font-size: 1.5rem;
}
.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  line-height: 1.75;
  color: #d1d5db; /* text-gray-300 */
}
.prose a {
  color: #60a5fa; /* text-blue-400 */
  text-decoration: underline;
}
.prose ul {
  list-style-type: disc;
  padding-left: 1.625em;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  color: #d1d5db;
}
.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.prose blockquote {
  font-style: italic;
  border-left-width: 0.25rem;
  border-color: #374151; /* border-gray-700 */
  padding-left: 1rem;
  color: #9ca3af; /* text-gray-400 */
}
.prose code {
  color: #f3f4f6; /* text-gray-100 */
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
}
</style>
