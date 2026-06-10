import { SITE, SITE_PAGES, SITE_URL } from './site-content';

function escapeXml(value: string): string {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

export function buildSitemapXml(lastmod = SITE.lastUpdated): string {
    const urls = SITE_PAGES.map((page) => {
        const loc = new URL(page.path, SITE_URL).href;
        return [
            '    <url>',
            `        <loc>${escapeXml(loc)}</loc>`,
            `        <lastmod>${lastmod}</lastmod>`,
            `        <changefreq>${page.changefreq}</changefreq>`,
            `        <priority>${page.priority}</priority>`,
            '    </url>',
        ].join('\n');
    });

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        '</urlset>',
        '',
    ].join('\n');
}
