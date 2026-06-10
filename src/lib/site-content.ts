export const SITE_URL = 'https://jack.mcpickle.com.au';

export const SITE = {
    url: SITE_URL,
    name: 'Jack McPickle',
    alternateName: 'jack.mcpickle',
    brand: 'jack.mcpickle/dev',
    email: 'jack@mcpickle.com.au',
    role: 'AI Engineer / Developer / Tech Leader',
    location: 'Australia',
    locationDetail: 'Australia (remote worldwide)',
    lastUpdated: '2026-06-10',
    lastUpdatedLabel: '10 June 2026',
    github: 'https://github.com/jackmcpickle',
    linkedin: 'https://www.linkedin.com/in/jackmcpickle/',
} as const;

export const HOME_PAGE = {
    title: 'Jack McPickle — AI Engineer, Developer & Tech Leader',
    description:
        'Jack McPickle is an Australian consultant, instructor, and developer who mentors founders on AI workflows and agentic development, contributes to the Claude community, and ships e-commerce and platform work worldwide.',
    lead: 'Jack McPickle is an Australian consultant and developer who helps founders and teams build with AI—from practical workflows to production agents. He mentors technical and non-technical leaders, contributes to the Claude developer community, and still ships e-commerce and platform work worldwide.',
    bio: 'Jack designs agentic systems, coaches teams through AI product delivery, and builds developer tools for the Claude ecosystem. His background spans large-scale e-commerce, platform migrations, and long-term engineering mentorship.',
    summary:
        'Jack McPickle is an Australian consultant, instructor, and developer who mentors founders on AI workflows and agentic development, contributes to the Claude community, and delivers e-commerce and platform work worldwide.',
} as const;

export const ABOUT_PAGE = {
    title: 'About Jack McPickle — AI Engineer & Tech Leader',
    description:
        'Learn about Jack McPickle, an Australian consultant and developer who mentors founders on AI workflows and agents, contributes to the Claude community, and delivers e-commerce and platform work at scale.',
    heading: 'About Jack McPickle',
    lead: 'Jack McPickle is a consultant, instructor, and developer based in Australia. He helps founders and teams build with AI—from practical workflows to production agents—and mentors technical and non-technical leaders through strategy, implementation, and delivery.',
    whatJackDoes:
        'Jack blends AI product strategy with hands-on engineering. He mentors founders—technical and non-technical—on where AI fits, how to design reliable workflows, and when to graduate from prompts to full agents. He is active in the Claude developer community, building skills, tools, and agent patterns that teams can ship. Alongside that work, he continues helping startups and brands on platform design, e-commerce delivery, and engineering coaching.',
    bio: 'Jack builds AI agents and developer tools, mentors founders and engineering teams, and keeps large platforms moving. He works with startups and established brands on agentic product delivery, architecture, migrations, and new feature delivery. Based in Australia, he collaborates with teams worldwide.',
    fullSummary:
        'Jack McPickle blends AI product strategy with hands-on engineering. He mentors technical and non-technical founders on AI workflows and production agents, contributes to the Claude developer community, and continues delivering large-scale e-commerce and platform work. Clients and teams rely on him for clear technical direction, pragmatic delivery, and mentoring across Claude, agentic tooling, Next.js, React, Magento, Shopify, WordPress, and headless commerce stacks.',
} as const;

export const SERVICES = [
    'AI strategy and agentic workflow design',
    'Founder mentoring — technical and non-technical teams',
    'Hands-on development: AI agents, web apps, and e-commerce',
    'Platform architecture, migrations, and long-term engineering coaching',
] as const;

export const SERVICES_DETAILED = [
    {
        title: 'AI & agents',
        description:
            'Workflow design, agent architecture, and production patterns with Claude and modern AI tooling',
    },
    { title: 'Consulting', description: 'Product strategy, technical audits, and architecture reviews' },
    {
        title: 'Development',
        description: 'Hands-on builds for agents, web apps, e-commerce, and internal tools',
    },
    {
        title: 'Instruction',
        description: 'Workshops and 1:1 mentoring on AI product delivery, frontend, and platform design',
    },
    {
        title: 'Migrations',
        description: 'Moving legacy stores and CMS sites to modern stacks (Next.js, headless)',
    },
] as const;

export const TECHNOLOGIES =
    'Claude, agentic workflows, MCP, Next.js, React, TypeScript, Astro, Magento, Shopify, WordPress, Craft CMS, Node.js, and headless commerce architectures.';

export const FAQ_ITEMS = [
    {
        question: 'Who is Jack McPickle?',
        answer: 'Jack McPickle is an Australian consultant, instructor, and developer. He mentors founders on AI workflows and agentic development, contributes to the Claude developer community, and helps teams design, build, and ship digital products—including e-commerce and platform architecture.',
    },
    {
        question: 'What services does Jack offer?',
        answer: 'Jack offers AI strategy and agentic workflow design, founder mentoring, hands-on development for agents and web apps, platform architecture, legacy migrations, and team coaching. He works with startups and established brands worldwide.',
    },
    {
        question: 'Does Jack help teams build with AI?',
        answer: 'Yes. Jack mentors founders and engineering teams on AI workflows, agent design, and shipping production-ready tooling—from early strategy through hands-on implementation in the Claude ecosystem and beyond.',
    },
    {
        question: 'How can I contact Jack?',
        answer: 'Email jack@mcpickle.com.au to discuss your project. You can also find Jack on GitHub at github.com/jackmcpickle and LinkedIn at linkedin.com/in/jackmcpickle.',
    },
    {
        question: 'What technologies does Jack work with?',
        answer: 'Jack works with Claude, agentic workflows, MCP, Next.js, React, TypeScript, Astro, Magento, Shopify, WordPress, Craft CMS, and headless commerce architectures.',
    },
    {
        question: 'Where is Jack based?',
        answer: 'Jack is based in Australia and works with clients and teams worldwide through remote collaboration.',
    },
    {
        question: 'Does Jack run workshops or speak at events?',
        answer: 'Yes. Jack delivers conference talks and hands-on workshops on AI product delivery, agentic workflows, component architecture, design systems, headless commerce, Next.js migrations, and performance budgets.',
    },
] as const;

export type FaqItem = (typeof FAQ_ITEMS)[number];

export const SITE_PAGES = [
    { path: '/', priority: 1.0, changefreq: 'monthly' as const },
    { path: '/about/', priority: 0.8, changefreq: 'monthly' as const },
] as const;

export const SECTION_LINKS = [
    { id: 'work', label: 'Selected work', description: 'Client projects across e-commerce and platforms' },
    { id: 'apps', label: 'Recent apps', description: 'AI tools, agents, and products Jack has shipped' },
    { id: 'talks', label: 'Talks and workshops', description: 'Conference and meetup sessions' },
    { id: 'faq', label: 'FAQ', description: 'Common questions about working with Jack' },
] as const;
