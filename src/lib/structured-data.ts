import { FAQ_ITEMS, HOME_PAGE, SITE, SITE_URL } from './site-content';

export { FAQ_ITEMS };
export type { FaqItem } from './site-content';

export function organizationSchema(profileImageUrl: string) {
    return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    alternateName: SITE.alternateName,
    url: SITE_URL,
    logo: profileImageUrl,
    email: SITE.email,
    description: HOME_PAGE.summary,
    sameAs: [SITE.github, SITE.linkedin],
    founder: {
        '@type': 'Person',
        name: SITE.name,
        jobTitle: SITE.role,
        email: SITE.email,
        url: `${SITE_URL}/about`,
        sameAs: [SITE.github, SITE.linkedin],
    },
    };
}

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.brand,
    url: SITE_URL,
    description: HOME_PAGE.description,
    publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE_URL,
    },
    inLanguage: 'en-AU',
};

export function personSchema(profileImageUrl: string) {
    return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    givenName: 'Jack',
    familyName: 'McPickle',
    jobTitle: SITE.role,
    url: `${SITE_URL}/about`,
    email: SITE.email,
    image: profileImageUrl,
    worksFor: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE_URL,
    },
    sameAs: [SITE.github, SITE.linkedin],
    knowsAbout: [
        'Product strategy',
        'Platform architecture',
        'E-commerce',
        'Next.js',
        'React',
        'Magento',
        'Shopify',
        'WordPress',
        'Team mentoring',
    ],
    };
}

export function faqPageSchema(items: typeof FAQ_ITEMS) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

export interface ArticleInput {
    title: string;
    event: string;
    date: string;
    url: string;
}

export function articleSchema(article: ArticleInput, profileImageUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        name: article.title,
        author: {
            '@type': 'Person',
            name: SITE.name,
            url: `${SITE_URL}/about`,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE_URL,
            logo: {
                '@type': 'ImageObject',
                url: profileImageUrl,
            },
        },
        datePublished: article.date.length === 7 ? `${article.date}-01` : article.date,
        url: article.url,
        mainEntityOfPage: article.url,
        about: article.event,
    };
}
