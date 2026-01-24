# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Project Overview

Personal portfolio site built with **Astro 5** and **Tailwind CSS 4**.
Single-page static site with content collections for project data.

## Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS 4.x (via Vite plugin)
- **Package Manager**: pnpm
- **Content**: Astro Content Collections with Zod schemas
- **Deployment**: GitHub Pages (static)

## Commands

```bash
# Install dependencies
pnpm install

# Development server (http://localhost:4321)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Test (runs build)
pnpm test
```

**No dedicated test runner** - the test script just runs the build.
No eslint or prettier configured.

## Project Structure

```
/
├── astro.config.mjs          # Astro + Tailwind Vite plugin config
├── package.json
├── public/
│   ├── robots.txt
│   └── images/               # Static images (profile pics, logos)
└── src/
    ├── content.config.ts     # Content collection schemas
    ├── styles/
    │   └── global.css        # Tailwind import + minimal overrides
    ├── layouts/
    │   └── BaseLayout.astro  # HTML shell, meta tags, fonts
    ├── pages/
    │   └── index.astro       # Single page entry
    ├── components/
    │   ├── Header.astro      # Profile + social links
    │   ├── Bio.astro         # About section
    │   ├── ProjectList.astro # Projects grid
    │   └── ProjectItem.astro # Project card component
    └── content/
        └── projects/         # Markdown files for portfolio items
```

## Code Style Guidelines

### Astro Components

1. **File naming**: PascalCase for components (`ProjectItem.astro`)
2. **Frontmatter structure**:
    - Imports first
    - Props interface definition
    - Destructure props from `Astro.props`

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
---

<div><!-- template --></div>
```

3. **Default props**: Use destructuring with defaults

```astro
const {
  title = "jack.mcpickle/dev",
  description = "Consultant / Instructor / Developer"
} = Astro.props;
```

### TypeScript

- Use TypeScript for type safety in frontmatter
- Import types with `import type { ... }` syntax
- Define content collection schemas with Zod in `src/content.config.ts`

### Content Collections

Schema definition pattern:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        name: z.string(),
        url: z.string().url(),
        tags: z.array(z.string()),
        order: z.number(),
    }),
});

export const collections = { projects };
```

### Project Markdown Format

```yaml
---
name: ProjectName
url: https://example.com/
tags:
    - nextjs
    - custom
    - e-commerce
order: 2
---
```

### Tailwind CSS

1. **Use utility classes inline** - no `@apply` directives
2. **Class organization**: Layout > Sizing > Spacing > Typography > Colors > Effects
3. **Responsive**: Use `sm:`, `lg:` breakpoint prefixes
4. **Dark theme**: Site uses dark palette (slate-950 bg, slate-100 text)
5. **Common patterns**:
    - Cards: `rounded-3xl ring-1 ring-slate-700/40`
    - Hover states: `transition hover:...`
    - Text hierarchy: `text-slate-100` (primary), `text-slate-400` (secondary)

### HTML/Accessibility

- Use semantic HTML (`<header>`, `<main>`, `<section>`)
- Add `aria-label` for icon-only links
- External links: `target="_blank" rel="noreferrer"`
- Images: Include `loading="lazy" decoding="async"` for non-critical images

### Imports

- Astro imports: `import { ... } from 'astro:content'`
- Local components: Relative paths from current file
- Styles: Import in layout `import '../styles/global.css'`

## Adding New Projects

1. Create markdown file in `src/content/projects/`
2. Use lowercase kebab-case filename: `project-name.md`
3. Include required frontmatter: `name`, `url`, `tags`, `order`
4. `order` determines display position (lower = first)

## Common Tasks

### Add a new component

1. Create `.astro` file in `src/components/`
2. Define Props interface if needed
3. Import and use in parent component

### Update styling

- Edit Tailwind classes directly in templates
- Global styles go in `src/styles/global.css`
- Use Tailwind 4 syntax (`@import 'tailwindcss'`)

### Add new page

- Create `.astro` file in `src/pages/`
- Use `BaseLayout` for consistent shell

## Git Workflow

- Renovate auto-merges dependency updates
- Build must pass (`pnpm build`) before merging
- No required linting or formatting checks

## Notes

- No environment variables needed
- No API routes - purely static site
- Analytics script loaded from external tracker
- Fonts loaded from Google Fonts (Fraunces, Space Grotesk)
