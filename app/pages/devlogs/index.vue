<script setup lang="ts">
const { data: devlogs } = await useAsyncData("devlogs", () => queryCollection("devlogs").order("date", "DESC").all());

useSeoMeta({
  title: "Devlogs | KamCy",
  description: "Read my latest thoughts, learnings, and experiences in software development.",
});
</script>

<template>
  <SiteNav />
  <main class="min-h-screen px-7 pt-32 pb-24 md:px-16 lg:px-24 xl:px-48">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-4 text-4xl font-bold md:tracking-wide">Devlogs</h1>
      <p class="mb-12 text-lg text-gray-400">
        Thoughts, learnings, and experiences from the trenches of software development.
      </p>

      <div class="grid gap-8">
        <NuxtLink
          v-for="log in devlogs"
          :key="log.path"
          :to="log.path"
          class="group block rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10"
        >
          <div class="mb-2 flex items-center gap-4 text-sm text-gray-400">
            <time v-if="log.date" :datetime="log.date">
              {{ new Date(log.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }}
            </time>
          </div>
          <h2 class="group-hover:text-primary-400 mb-3 text-2xl font-semibold transition-colors">
            {{ log.title }}
          </h2>
          <p class="text-gray-300">
            {{ log.description }}
          </p>
        </NuxtLink>

        <div v-if="!devlogs?.length" class="py-12 text-center text-gray-500">
          No devlogs found yet. Check back soon!
        </div>
      </div>
    </div>
  </main>
  <ContactSection />
</template>
