import type { APIRoute } from 'astro';
import { generateLlmsFullTxt } from '../lib/llms';

export const GET: APIRoute = async () => {
    const body = await generateLlmsFullTxt();

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
