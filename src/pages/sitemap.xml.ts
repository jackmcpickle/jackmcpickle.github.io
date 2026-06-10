import type { APIRoute } from 'astro';
import { buildSitemapXml } from '../lib/sitemap';

export const GET: APIRoute = () => {
    const body = buildSitemapXml();

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
};
