import { getCollection, type CollectionEntry } from 'astro:content';

export async function getSortedProjects(): Promise<
    CollectionEntry<'projects'>[]
> {
    return (await getCollection('projects')).sort(
        (a: CollectionEntry<'projects'>, b: CollectionEntry<'projects'>) =>
            a.data.order - b.data.order,
    );
}

export async function getSortedApps(): Promise<CollectionEntry<'apps'>[]> {
    return (await getCollection('apps')).sort(
        (a: CollectionEntry<'apps'>, b: CollectionEntry<'apps'>) =>
            a.data.order - b.data.order,
    );
}

export async function getSortedTalks(): Promise<CollectionEntry<'talks'>[]> {
    return (await getCollection('talks')).sort(
        (a: CollectionEntry<'talks'>, b: CollectionEntry<'talks'>) =>
            a.data.order - b.data.order,
    );
}

export async function getSortedListening(): Promise<
    CollectionEntry<'listening'>[]
> {
    return (await getCollection('listening')).sort(
        (a: CollectionEntry<'listening'>, b: CollectionEntry<'listening'>) =>
            a.data.order - b.data.order,
    );
}

export async function getSortedAnime(): Promise<CollectionEntry<'anime'>[]> {
    return (await getCollection('anime')).sort(
        (a: CollectionEntry<'anime'>, b: CollectionEntry<'anime'>) =>
            a.data.order - b.data.order,
    );
}

export async function getAllSiteCollections(): Promise<{
    projects: CollectionEntry<'projects'>[];
    apps: CollectionEntry<'apps'>[];
    talks: CollectionEntry<'talks'>[];
    listening: CollectionEntry<'listening'>[];
    anime: CollectionEntry<'anime'>[];
}> {
    const [projects, apps, talks, listening, anime] = await Promise.all([
        getSortedProjects(),
        getSortedApps(),
        getSortedTalks(),
        getSortedListening(),
        getSortedAnime(),
    ]);

    return { projects, apps, talks, listening, anime };
}
