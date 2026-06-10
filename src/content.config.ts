import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'
import { glob } from 'astro/loaders';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        name: z.string(),
        url: z.string().url(),
        tags: z.array(z.string()),
        order: z.number(),
    }),
});

const apps = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/apps' }),
    schema: z.object({
        name: z.string(),
        description: z.string(),
        url: z.url(),
        github: z.url().optional(),
        tags: z.array(z.string()),
        order: z.number(),
    }),
});

const listening = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/listening' }),
    schema: z.object({
        title: z.string(),
        creator: z.string(),
        description: z.string().optional(),
        url: z.url(),
        tags: z.array(z.string()),
        order: z.number(),
    }),
});

const talks = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
    schema: z.object({
        title: z.string(),
        event: z.string(),
        date: z.string(),
        url: z.url(),
        tags: z.array(z.string()),
        order: z.number(),
    }),
});

const anime = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/anime' }),
    schema: z.object({
        title: z.string(),
        chapter: z.string(),
        order: z.number(),
    }),
});

export const collections = { projects, apps, listening, talks, anime };
