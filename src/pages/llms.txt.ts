import type { APIRoute } from 'astro';
import { generateLlmsTxt } from '../lib/llms';

export const GET: APIRoute = async () => {
    const body = await generateLlmsTxt();

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
