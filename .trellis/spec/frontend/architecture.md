# Project Architecture

This repository is a single Astro 4 static blog. The source of truth for
published content is the blog content collection; pages, layouts, and
components turn that collection into static HTML and a small set of generated
assets and feeds.

## Runtime Shape

| Area | Responsibility | Representative files |
| --- | --- | --- |
| Content | Markdown posts and their validated frontmatter | src/content/blog/*.md, src/content/config.ts |
| Routes | Static pages, dynamic post/tag routes, and endpoint responses | src/pages/, src/pages/posts/[slug]/, src/pages/tags/[tag]/ |
| Layouts | Page shells and data-to-view composition | src/layouts/Layout.astro, Posts.astro, PostDetails.astro, TagPosts.astro |
| Components | Reusable Astro markup plus server-rendered React components | src/components/, src/components/Card.tsx, Search.tsx |
| Domain utilities | Filtering, sorting, pagination, tag normalization, and slugging | src/utils/ |
| Shared configuration | Site metadata, locale, social links, environment-selected site line | src/config.ts, src/types.ts, src/env.d.ts |
| Styling and browser behavior | Tailwind tokens, base styles, theme persistence, and view-transition reinitialization | src/styles/base.css, tailwind.config.cjs, public/toggle-theme.js |

There is no application backend, database, API client layer, global state
store, or test directory. New work should fit the existing static-content
shape unless the product requirement explicitly introduces a new runtime.

## Content-to-Page Flow

1. A route calls getCollection("blog") to load typed CollectionEntry<"blog">
   values.
2. getSortedPosts applies postFilter (draft and scheduled-publication rules)
   and sorts by modification date, falling back to publication date.
3. getPostsByTag, getUniqueTags, and getPagination derive route-specific views
   without owning presentation markup.
4. Route files pass small, typed props to layouts such as Posts or PostDetails;
   layouts compose Layout, Header, Footer, and leaf components.
5. Layout.astro owns document metadata, canonical URLs, Open Graph/Twitter
   tags, global CSS, Astro view transitions, and the inline theme bootstrap.

Keep this flow one-directional. Do not query content from a leaf component or
duplicate filtering rules in markup. src/pages/search.astro is the one
intentional exception where a route builds a serializable search list for the
SearchBar client island.

## Build Variants and Deployment

src/config.ts resolves PUBLIC_SITE_LINE to either overseas or domestic,
selecting the canonical hostname from WEBSITE_BY_LINE. The default is overseas;
unknown values must not create a third site line.

Use the package scripts as the build contract:

- pnpm run build:overseas builds the overseas site.
- pnpm run build:cn builds the domestic site.
- Both run astro check, astro build, and jampack through build:base.

.github/workflows/pages.yml builds both variants, stores them as separate
artifacts, publishes the overseas build to GitHub Pages, and sends the two
artifacts to the server deployment job. scripts/deploy_server.sh uploads a
variant into a timestamped releases/release-* directory, switches the current
symlink atomically, and prunes old releases. Changes to routes, content
rendering, or site configuration should be checked against both build variants.

## Generated Assets and Endpoints

- src/pages/rss.xml.ts creates the RSS feed from the same sorted collection
  used by post pages.
- src/pages/robots.txt.ts derives the sitemap URL from SITE.website.
- src/pages/og.png.ts and src/pages/posts/[slug]/index.png.ts render PNGs with
  Satori and Resvg through src/utils/generateOgImages.tsx.

OG generation fetches IBM Plex Mono font files at module evaluation time, so a
production build needs outbound access to those font URLs. Keep generated image
handlers thin and put rendering details in src/utils/og-templates/.

## Architectural Anti-Patterns

- Adding a client fetch for blog content when a content collection can provide
  the data at build time.
- Bypassing postFilter or getSortedPosts in a new listing route, which can
  expose drafts or scheduled posts.
- Hardcoding a canonical hostname in a page or endpoint instead of using
  SITE.website and the PUBLIC_SITE_LINE configuration.
- Moving route-specific pagination or tag selection into a component that
  cannot see the route's static parameters.
- Introducing a global state library for behavior currently local to a single
  island or browser script.
