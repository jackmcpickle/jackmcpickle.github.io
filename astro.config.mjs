import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
    output: 'static',
    site: 'https://jack.mcpickle.com.au',
    integrations: [
        sitemap({
            filter: (page) =>
                !page.endsWith('.txt') && !page.endsWith('/sitemap.xml'),
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});
