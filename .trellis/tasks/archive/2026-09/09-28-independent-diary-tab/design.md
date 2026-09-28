# Technical Design

## Architecture and boundaries

Journal is a second Astro content collection with the same frontmatter contract as `blog`, stored in `src/content/journal/`. Routes and collection-aware utilities keep Journal separate from blog-only pages while shared layouts/components handle identical Markdown/date presentation.

- `src/content/config.ts`: define one shared schema factory using Astro's `SchemaContext`, then register independent `blog` and `journal` collections.
- `src/types.ts`: add the closed `ContentCollection` union and a `ContentEntry` union for `CollectionEntry<"blog"> | CollectionEntry<"journal">`; use it at shared route/layout/component boundaries.
- `src/utils/postFilter.ts` and `src/utils/getSortedPosts.ts`: make filtering/sorting generic over `ContentEntry` so both collections apply the same draft, scheduled-publication, and date-order rules.
- `src/layouts/Posts.astro`, `src/layouts/PostDetails.astro`, and `src/components/Card.tsx`: accept the shared entry/data types and derive collection labels/base paths. Existing blog callers keep their current defaults; Journal callers pass `collection="journal"` or use the entry collection discriminator. Journal details suppress the blog-only tag links so Journal tags cannot route into the blog tag index.
- `src/components/Header.astro`: extend `activeNav` with `journal`; render Journal as the rightmost text link before Search/theme controls, followed by an `aria-hidden` vertical divider span. Existing menu grid and icon controls stay intact.

## Routes and data flow

1. `src/pages/journal/index.astro` loads `getCollection("journal")`, applies the shared sort/filter, paginates with `getPagination`, and renders `Posts` with `collection="journal"`.
2. `src/pages/journal/[slug]/index.astro` builds static paths from published Journal entries plus numeric pagination paths. It renders `PostDetails` for an entry or `Posts` for a numeric page, with Journal base-path/active-nav metadata.
3. `PostDetails` renders the union entry's Markdown and common metadata, marks Journal pages active, and chooses `/journal/<title-slug>.png` as the generated OG fallback for Journal entries; blog fallback URLs remain under `/posts/`.
4. `src/pages/journal/[slug]/index.png.ts` mirrors the blog OG endpoint for Journal entries and reuses the generalized OG generator/template.
5. `src/pages/search.astro` loads both collections, combines them before shared sorting, and serializes a discriminated search item containing collection and route. `Search.tsx` keeps one Fuse index, uses the item route, and passes a visible `Journal` type label to Journal result cards.
6. `src/pages/rss.xml.ts` combines both sorted collections. Blog item links remain `posts/<slug>/`; Journal links are `journal/<slug>/` and add `categories: ["Journal"]` to make the type explicit in RSS.
7. Homepage, Posts routes, Tags routes, and tag utilities continue querying only `blog`, so Journal entries cannot leak into blog-only surfaces.

## Interface and compatibility details

- `Posts` receives an optional collection/base-path setting with blog defaults, so existing `/posts/` and numeric post routes keep their URLs and copy.
- `Card` receives an optional `typeLabel` used for Journal search/list results; the default leaves existing blog cards visually unchanged.
- `SearchItem` changes from a blog-only data type to the shared content data plus a `collection` discriminator and route-safe href. The Fuse keys remain title and description.
- RSS keeps existing post fields and links, adding only Journal items and their category marker.
- Generated OG template markup remains the same; only its entry type widens to the shared union.

## Failure and edge-case handling

- Draft and future-scheduled Journal entries are filtered through the same shared predicate before listing, search, RSS, and static path generation.
- Numeric Journal pagination paths are generated from the published-entry count; invalid numeric segments resolve to the existing empty/disabled pagination behavior rather than exposing content.
- Journal slugs are collection-local under `/journal/`, so a slug matching a blog post does not collide.
- The Journal divider is decorative (`aria-hidden`) and does not create an extra focus target; the link remains the only interactive element.
- If a Journal entry supplies its own `ogImage`, it wins exactly as it does for blog posts; otherwise the Journal-specific generated endpoint is used.

## Rollback and migration

The change is additive. Removing the Journal route directory and collection registration restores the prior blog-only build; no existing Markdown files or frontmatter need migration. Existing blog routes and generated assets remain compatible.
