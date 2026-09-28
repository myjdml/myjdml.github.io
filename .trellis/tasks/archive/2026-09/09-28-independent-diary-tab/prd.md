# Add an independent Journal tab and content collection

## Goal

Add a `Journal` tab for short diary-like records. Journal entries must be authored and stored independently from long-form blog posts while retaining the same static, post-like browsing experience.

## Background and confirmed constraints

- The site is an Astro static build. The current `blog` content collection is declared in `src/content/config.ts` and populated under `src/content/blog/`.
- Blog listing and detail routes are under `src/pages/posts/`; shared list/detail composition lives in `src/layouts/Posts.astro` and `src/layouts/PostDetails.astro`.
- The primary navigation is rendered by `src/components/Header.astro`, with Posts, Tags, About, Search, and theme controls.
- Published content is filtered and sorted by `src/utils/postFilter.ts` and `src/utils/getSortedPosts.ts`; there is no backend or runtime database.
- The selected tab label and route are `Journal` and `/journal/`.
- The selected navigation position is the rightmost text link, immediately before Search/theme controls; the vertical separator belongs between Journal and those controls.

## Requirements

- Add a dedicated English `Journal` navigation tab with an active state on Journal listing and detail pages.
- Keep Journal Markdown entries in a separate `src/content/journal/` directory and separate `journal` content collection. Replicate the current blog frontmatter schema so date, draft, title, description, tags, OG image, canonical URL, and author behavior remain validated and reusable without changing the `blog` entry type.
- Add a `/journal/` listing and `/journal/[slug]/` detail route. Use the existing published filtering, modification/publication sorting, pagination, Markdown rendering, date display, site shell, and generated OG-image behavior where compatible.
- Put the Journal link at the right edge of the text navigation, immediately before Search/theme controls, and render a visible vertical divider between them. Preserve responsive menu behavior, semantic navigation, keyboard focus, and active-state styling.
- Keep Journal entries out of blog-only Posts, Tags, and homepage sections. Include Journal entries in Search and RSS with an explicit Journal type/category label so they are discoverable without being presented as blog posts.

## Acceptance Criteria

- [ ] The header exposes one English `Journal` link to `/journal/`, marks it active on Journal listing/detail pages, places it immediately before Search/theme controls, and shows a visible vertical separator between the groups.
- [ ] Desktop and mobile navigation retain the existing open/close behavior, semantic links, visible keyboard focus, and theme/search controls after the new item is added.
- [ ] `src/content/config.ts` exports independent `blog` and `journal` collections; `src/content/journal/` is separate from `src/content/blog/`; Journal frontmatter is validated at build time and inferred as a distinct collection entry type.
- [ ] `/journal/` lists only published Journal entries in descending modification/publication order and uses the same pagination behavior as Posts.
- [ ] Every published Journal entry has a stable `/journal/[slug]/` route, renders Markdown and date metadata in the site shell, and resolves its own generated/default OG image path.
- [ ] Posts, Tags, and homepage sections continue to use only `blog` entries; no Journal entry appears there.
- [ ] Search includes both collections and visibly identifies Journal results as Journal; result links resolve to the correct collection route.
- [ ] RSS includes both collections, uses collection-specific links, and marks Journal items with an explicit `Journal` category while preserving existing post items.
- [ ] `pnpm run astro check`, `pnpm run lint`, `pnpm run format:check`, `pnpm run build:cn`, and `pnpm run build:overseas` pass after implementation.

## Scope boundaries

- The homepage remains blog-only; it does not gain a Journal preview section.
- Tags remain blog-only; Journal tags are not added to the existing tag index or tag routes.
- No authoring UI, backend, database, comments, or runtime content fetching is introduced.
