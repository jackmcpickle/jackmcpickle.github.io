import type { CollectionEntry } from 'astro:content';
import { getAllSiteCollections } from './collections';
import {
    ABOUT_PAGE,
    FAQ_ITEMS,
    HOME_PAGE,
    SECTION_LINKS,
    SERVICES,
    SERVICES_DETAILED,
    SITE,
    SITE_URL,
    TECHNOLOGIES,
} from './site-content';

interface SiteCollections {
    projects: CollectionEntry<'projects'>[];
    apps: CollectionEntry<'apps'>[];
    talks: CollectionEntry<'talks'>[];
    listening: CollectionEntry<'listening'>[];
    anime: CollectionEntry<'anime'>[];
}

function projectFocus(project: CollectionEntry<'projects'>) {
    return project.data.tags.join(', ');
}

function formatTalk(talk: CollectionEntry<'talks'>) {
    return `${talk.data.title} — ${talk.data.event}, ${talk.data.date}`;
}

function formatFaq() {
    return FAQ_ITEMS.map((item) => `**${item.question}**\n${item.answer}`).join('\n\n');
}

export function buildLlmsTxt(collections?: SiteCollections) {
    const lines = [
        `# ${SITE.name}`,
        '',
        `> ${HOME_PAGE.summary}`,
        '',
        '## About',
        '',
        `- [About ${SITE.name}](${SITE_URL}/about): Background, services, and contact details`,
        `- [Portfolio home](${SITE_URL}/): Selected work, apps, talks, and FAQs`,
        '',
        '## Services',
        '',
        ...SERVICES.map((service) => `- ${service}`),
        '',
        '## Contact',
        '',
        `- Email: ${SITE.email}`,
        `- GitHub: ${SITE.github}`,
        `- LinkedIn: ${SITE.linkedin}`,
        '',
        '## Key content',
        '',
        ...SECTION_LINKS.map(
            (section) =>
                `- [${section.label}](${SITE_URL}/#${section.id}): ${section.description}`,
        ),
        '',
        '## Technologies',
        '',
        TECHNOLOGIES,
    ];

    if (collections) {
        lines.push(
            '',
            '## Selected work',
            '',
            ...collections.projects.map(
                (project) =>
                    `- [${project.data.name}](${project.data.url}): ${projectFocus(project)}`,
            ),
            '',
            '## Recent apps',
            '',
            ...collections.apps.map(
                (app) => `- [${app.data.name}](${app.data.url}): ${app.data.description}`,
            ),
        );
    }

    return `${lines.join('\n')}\n`;
}

export function buildLlmsFullTxt(collections: SiteCollections) {
    const projectRows = collections.projects
        .map(
            (project) =>
                `| ${project.data.name} | ${project.data.url} | ${projectFocus(project)} |`,
        )
        .join('\n');

    const appRows = collections.apps
        .map((app) => `| ${app.data.name} | ${app.data.description} | ${app.data.url} |`)
        .join('\n');

    const talkLines = collections.talks.map((talk) => `- ${formatTalk(talk)}`).join('\n');
    const podcastLines = collections.listening
        .map((item) => `- ${item.data.title} — ${item.data.creator}`)
        .join('\n');

    const lines = [
        `# ${SITE.name} — Full Site Content`,
        '',
        `> ${ABOUT_PAGE.fullSummary}`,
        '',
        `Last updated: ${SITE.lastUpdated}`,
        `Site: ${SITE_URL}`,
        `Email: ${SITE.email}`,
        `GitHub: ${SITE.github}`,
        `LinkedIn: ${SITE.linkedin}`,
        '',
        '---',
        '',
        '## Summary',
        '',
        ABOUT_PAGE.fullSummary,
        '',
        '---',
        '',
        `## About ${SITE.name}`,
        '',
        ABOUT_PAGE.bio,
        '',
        `Role: ${SITE.role}`,
        `Location: ${SITE.locationDetail}`,
        '',
        '---',
        '',
        '## What Jack does',
        '',
        ABOUT_PAGE.whatJackDoes,
        '',
        '---',
        '',
        '## Services',
        '',
        ...SERVICES_DETAILED.map(
            (service) => `- **${service.title}** — ${service.description}`,
        ),
        '',
        '---',
        '',
        '## Technologies',
        '',
        TECHNOLOGIES,
        '',
        '---',
        '',
        '## Selected client work',
        '',
        '| Project | URL | Focus |',
        '|---------|-----|-------|',
        projectRows,
        '',
        '---',
        '',
        '## Recent apps and tools',
        '',
        '| App | Description | URL |',
        '|-----|-------------|-----|',
        appRows,
        '',
        '---',
        '',
        '## Talks and workshops',
        '',
        talkLines,
        '',
        '---',
        '',
        '## Podcasts on rotation',
        '',
        podcastLines,
        '',
        '---',
        '',
        '## Frequently asked questions',
        '',
        formatFaq(),
        '',
        '---',
        '',
        '## Site structure',
        '',
        `- \`/\` — Portfolio home with work, apps, talks, podcasts, and FAQ`,
        `- \`/about\` — Extended bio, services, and contact information`,
        `- \`/llms.txt\` — Concise LLM-oriented site summary`,
        `- \`/llms-full.txt\` — This file; comprehensive site content for AI systems`,
    ];

    return `${lines.join('\n')}\n`;
}

export async function generateLlmsTxt() {
    const collections = await getAllSiteCollections();
    return buildLlmsTxt(collections);
}

export async function generateLlmsFullTxt() {
    const collections = await getAllSiteCollections();
    return buildLlmsFullTxt(collections);
}
