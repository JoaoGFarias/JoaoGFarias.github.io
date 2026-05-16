import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    // Original Jekyll URL (e.g. "/blog/2018-08-28/5_links_refactoring/")
    // Used to keep production URLs byte-identical post-migration.
    urlPath: z.string(),
  }),
});

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string(),
    company: z.string().optional(),
    period: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, portfolio };
