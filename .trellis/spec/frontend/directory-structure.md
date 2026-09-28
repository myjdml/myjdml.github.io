# Directory Structure

The project is a single Astro site. Route files own static data loading and
getStaticPaths; layouts compose page structure; components render reusable
markup; utilities transform typed content entries.

## Directory Layout

    .
    ├── public/                         # Files copied as-is, including theme JS and logos
    ├── src/
    │   ├── assets/                     # Imported assets and the social icon map
    │   ├── components/                 # Reusable .astro components and React islands
    │   ├── content/
    │   │   ├── blog/                   # Markdown posts
    │   │   ├── journal/                # Independent Journal records
    │   │   └── config.ts               # Astro content collection schema
    │   ├── layouts/                    # Page shells and post/list compositions
    │   ├── pages/                      # File-based routes and .ts endpoints
    │   ├── styles/base.css             # Tailwind layers and theme tokens
    │   ├── utils/                      # Pure post, tag, pagination, and OG helpers
    │   ├── config.ts                   # Site, locale, social, and site-line config
    │   ├── types.ts                    # Shared config types
    │   └── env.d.ts                    # Typed public environment variables
    ├── scripts/deploy_server.sh       # Release/current symlink deployment
    ├── .github/workflows/pages.yml    # Dual-site build and deployment pipeline
    ├── astro.config.ts
    ├── tailwind.config.cjs
    └── tsconfig.json

## Module Organization

### Routes

Use src/pages/ for user-visible routes and generated endpoints. The current
route families are:

- index.astro, about.md, 404.astro, and search.astro for standalone pages.
- posts/index.astro and posts/[slug]/index.astro for the post list, post
  details, and numeric pagination paths.
- journal/index.astro and journal/[slug]/index.astro for the independent
  Journal list, details, and numeric pagination paths. Journal routes use the
  same shared layouts with the `journal` collection discriminator.
- tags/index.astro, tags/[tag]/index.astro, and tags/[tag]/[page].astro for tag
  discovery and pagination.
- rss.xml.ts, robots.txt.ts, og.png.ts, and posts/[slug]/index.png.ts for
  endpoint responses and generated images.

Load collections and resolve route parameters in the route frontmatter, then
pass typed props to a layout. Keep route files free of reusable presentation
markup when a layout or component already owns it.

### Layouts and components

Layout.astro is the document shell. Main.astro is the shared list-page body,
while Posts.astro, TagPosts.astro, PostDetails.astro, and AboutLayout.astro
combine it with route-specific data. Components such as Header.astro,
Footer.astro, Pagination.astro, and Tag.astro remain small and reusable.

React is used only where a component benefits from React rendering or browser
state (Card.tsx, Datetime.tsx, and the Search.tsx island). Do not create a
parallel feature directory or move content logic into React components.

### Utilities and content

Utilities in src/utils/ are small, composable functions. Examples include
getSortedPosts.ts, getPostsByTag.ts, and getPagination.ts. They should accept
typed values and return derived data, leaving markup to pages and layouts.

Markdown files in src/content/blog/ and src/content/journal/ are the editorial
data sources. Both collections satisfy the shared schema in
src/content/config.ts, but their entries remain collection-specific; the URL
used by the app comes from Astro's entry slug under the owning route prefix.

## Naming Conventions

- Astro layouts and components use PascalCase filenames (PostDetails.astro,
  Pagination.astro). React components follow the same convention (Card.tsx,
  Search.tsx).
- Utility modules use lower camel case (getSortedPosts.ts, slugify.ts).
- Dynamic route segments use Astro's bracket form ([slug], [tag], [page]) and
  endpoint siblings use the same route directory.
- Markdown posts use kebab-case filenames and are referenced through the
  generated slug.
- Prefer the @config, @components/*, @content/*, @layouts/*, @pages/*,
  @styles/*, and @utils/* aliases configured in tsconfig.json for cross-area
  imports. Relative imports are common inside a component or utility area.

## Examples

- Content-to-layout route: src/pages/posts/[slug]/index.astro.
- Shared list composition: src/layouts/Posts.astro and
  src/layouts/TagPosts.astro.
- Typed pure utility chain: src/utils/getPostsByTag.ts to
  src/utils/getSortedPosts.ts to src/utils/postFilter.ts.
