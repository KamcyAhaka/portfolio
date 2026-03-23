import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/a11y",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxtjs/seo",
    "nuxt-studio",
  ],
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],

  routeRules: {
    "/devlogs/**": { prerender: true },
    "/devlogs": { prerender: true },
  },
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss() as any],
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: "double",
      },
    },
  },

  fonts: {
    families: [
      {
        name: "Syne",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
        styles: ["normal", "italic"],
      },
    ],
  },
});
