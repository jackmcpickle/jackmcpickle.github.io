import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    output: 'static',
    site: 'https://jack.mcpickle.com.au',
    integrations: [sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
});
