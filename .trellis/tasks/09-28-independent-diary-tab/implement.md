# Implementation Plan

1. **Add the collection contract**
   - Refactor `src/content/config.ts` to a shared schema factory and register `journal` alongside `blog`.
   - Add `ContentCollection`/`ContentEntry` shared types and generalize `postFilter`/`getSortedPosts` without changing filtering semantics.
   - Create `src/content/journal/` as the independent Markdown source directory and track an ignored-by-Astro `.gitkeep` until the first real Journal entry is added.

2. **Generalize shared presentation**
   - Extend `Header.astro` active-nav types and add the right-edge Journal link plus decorative divider.
   - Update `Card.tsx`, `Posts.astro`, and `PostDetails.astro` to accept union entries, optional collection/base-path settings, Journal labels, and collection-aware OG fallback/active navigation.

3. **Add Journal routes and generated images**
   - Add `/journal/` listing and `/journal/[slug]/` detail/numeric pagination routes using published Journal entries and shared pagination.
   - Add the Journal OG endpoint and widen OG generation/template input types.

4. **Integrate explicit cross-surface discovery**
   - Update `search.astro` and `Search.tsx` to combine both collections, route each result correctly, and label Journal results.
   - Update `rss.xml.ts` to combine both collections and mark Journal items with the `Journal` category; keep homepage, Posts, and Tags blog-only.

5. **Run the quality gate and review boundaries**
   - Run `pnpm run astro check`, `pnpm run lint`, and `pnpm run format:check`.
   - Run both `pnpm run build:cn` and `pnpm run build:overseas`.
   - Inspect generated routes/content behavior for `/journal/`, `/journal/<slug>/`, Search, RSS, Posts, Tags, and homepage; fix any type, route, accessibility, or format drift before commit.
