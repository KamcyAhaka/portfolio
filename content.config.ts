import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    devlogs: defineCollection({
      type: "page",
      source: "devlogs/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date({ coerce: true }),
        published: z.boolean().default(true),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
});
