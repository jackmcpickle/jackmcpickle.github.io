import { getCollection, type CollectionEntry } from 'astro:content';

export async function getSortedProjects() {
    return (await getCollection('projects')).sort(
        (a: CollectionEntry<'projects'>, b: CollectionEntry<'projects'>) =>
            a.data.order - b.data.order,
    );
}

export async function getSortedApps() {
    return (await getCollection('apps')).sort(
        (a: CollectionEntry<'apps'>, b: CollectionEntry<'apps'>) => a.data.order - b.data.order,
    );
}

export async function getSortedTalks() {
    return (await getCollection('talks')).sort(
        (a: CollectionEntry<'talks'>, b: CollectionEntry<'talks'>) => a.data.order - b.data.order,
    );
}

export async function getSortedListening() {
    return (await getCollection('listening')).sort(
        (a: CollectionEntry<'listening'>, b: CollectionEntry<'listening'>) =>
            a.data.order - b.data.order,
    );
}

export async function getSortedAnime() {
    return (await getCollection('anime')).sort(
        (a: CollectionEntry<'anime'>, b: CollectionEntry<'anime'>) => a.data.order - b.data.order,
    );
}

export async function getAllSiteCollections() {
    const [projects, apps, talks, listening, anime] = await Promise.all([
        getSortedProjects(),
        getSortedApps(),
        getSortedTalks(),
        getSortedListening(),
        getSortedAnime(),
    ]);

    return { projects, apps, talks, listening, anime };
}
