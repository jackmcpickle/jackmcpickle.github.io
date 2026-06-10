export const SITE_URL = 'https://jack.mcpickle.com.au';

export const SITE = {
    url: SITE_URL,
    name: 'Jack McPickle',
    alternateName: 'jack.mcpickle',
    brand: 'jack.mcpickle/dev',
    email: 'jack@mcpickle.com.au',
    role: 'Consultant / Instructor / Developer',
    location: 'Australia',
    locationDetail: 'Australia (remote worldwide)',
    lastUpdated: '2026-06-10',
    lastUpdatedLabel: '10 June 2026',
    github: 'https://github.com/jackmcpickle',
    linkedin: 'https://www.linkedin.com/in/jackmcpickle/',
} as const;

export const HOME_PAGE = {
    title: 'Jack McPickle — Consultant, Instructor & Developer',
    description:
        'Jack McPickle is an Australian consultant, instructor, and developer who builds digital products, mentors engineering teams, and ships e-commerce and platform work for clients worldwide.',
    lead: 'Jack McPickle is an Australian consultant and developer who helps teams build digital products, ship e-commerce platforms, and grow strong engineering habits. He works with clients worldwide on strategy, code, and delivery.',
    bio: 'Jack builds web apps, guides platform upgrades, and mentors developers through complex projects. His work covers new product launches, store migrations, and long-term platform care for retail and tech teams.',
    summary:
        'Jack McPickle is an Australian consultant, instructor, and developer who builds digital products, mentors engineering teams, and delivers large-scale e-commerce and platform work worldwide.',
} as const;

export const ABOUT_PAGE = {
    title: 'About Jack McPickle — Consultant & Developer',
    description:
        'Learn about Jack McPickle, an Australian consultant, instructor, and developer who helps teams build digital products, modernise platforms, and deliver e-commerce at scale.',
    heading: 'About Jack McPickle',
    lead: 'Jack McPickle is a consultant, instructor, and developer based in Australia. He helps teams plan, build, and ship digital products — from e-commerce stores to developer tools — and mentors engineers on architecture and delivery.',
    whatJackDoes:
        'Jack blends product strategy with hands-on engineering. He works with startups and established brands on platform design, feature delivery, and team coaching. His work spans greenfield builds, legacy migrations, and long-running platform improvements.',
    bio: 'Jack builds digital products, mentors development teams, and keeps large platforms moving. He works with startups and established brands on architecture, migrations, and new feature delivery. Based in Australia, he collaborates with teams worldwide.',
    fullSummary:
        'Jack McPickle blends product strategy with hands-on engineering. He works on large-scale e-commerce, platform architecture, and greenfield product builds. Clients and teams rely on him for clear technical direction, pragmatic delivery, and mentoring across Next.js, React, Magento, Shopify, WordPress, and headless commerce stacks.',
} as const;

export const SERVICES = [
    'Product strategy and technical consulting',
    'Platform architecture for e-commerce and web apps',
    'Hands-on development and team mentoring',
    'Greenfield builds and legacy platform migrations',
] as const;

export const SERVICES_DETAILED = [
    { title: 'Consulting', description: 'Product strategy, technical audits, and architecture reviews' },
    { title: 'Development', description: 'Hands-on builds for web apps, e-commerce, and internal tools' },
    { title: 'Instruction', description: 'Workshops and mentoring on modern frontend and platform design' },
    {
        title: 'Migrations',
        description: 'Moving legacy stores and CMS sites to modern stacks (Next.js, headless)',
    },
] as const;

export const TECHNOLOGIES =
    'Next.js, React, TypeScript, Astro, Magento, Shopify, WordPress, Craft CMS, Node.js, and headless commerce architectures.';

export const FAQ_ITEMS = [
    {
        question: 'Who is Jack McPickle?',
        answer: 'Jack McPickle is an Australian consultant, instructor, and developer. He helps teams design, build, and ship digital products, with a focus on e-commerce and platform architecture.',
    },
    {
        question: 'What services does Jack offer?',
        answer: 'Jack offers product consulting, hands-on development, platform architecture, legacy migrations, and team mentoring. He works with startups and established brands on web apps and e-commerce.',
    },
    {
        question: 'How can I contact Jack?',
        answer: 'Email jack@mcpickle.com.au to discuss your project. You can also find Jack on GitHub at github.com/jackmcpickle and LinkedIn at linkedin.com/in/jackmcpickle.',
    },
    {
        question: 'What technologies does Jack work with?',
        answer: 'Jack works with Next.js, React, TypeScript, Astro, Magento, Shopify, WordPress, Craft CMS, and headless commerce architectures.',
    },
    {
        question: 'Where is Jack based?',
        answer: 'Jack is based in Australia and works with clients and teams worldwide through remote collaboration.',
    },
    {
        question: 'Does Jack run workshops or speak at events?',
        answer: 'Yes. Jack delivers conference talks and hands-on workshops on component architecture, design systems, headless commerce, Next.js migrations, and performance budgets.',
    },
] as const;

export type FaqItem = (typeof FAQ_ITEMS)[number];

export const SITE_PAGES = [
    { path: '/', priority: 1.0, changefreq: 'monthly' as const },
    { path: '/about/', priority: 0.8, changefreq: 'monthly' as const },
] as const;

export const SECTION_LINKS = [
    { id: 'work', label: 'Selected work', description: 'Client projects across e-commerce and platforms' },
    { id: 'apps', label: 'Recent apps', description: 'Tools and products Jack has shipped' },
    { id: 'talks', label: 'Talks and workshops', description: 'Conference and meetup sessions' },
    { id: 'faq', label: 'FAQ', description: 'Common questions about working with Jack' },
] as const;
