# Quality Guidelines

The repository currently has no automated unit or end-to-end test suite. The
quality gate is static analysis, formatting, and successful static generation.

## Required Checks

Run these commands from the repository root after source or content changes:

    pnpm run astro check
    pnpm run lint
    pnpm run format:check
    pnpm run build:cn
    pnpm run build:overseas

pnpm run build:base is the shared implementation behind both site-line builds
and runs astro check, astro build, and jampack. CI uses Node 20, pnpm 9, and
pnpm install --frozen-lockfile; local verification should use the lockfile-
compatible package manager as well.

## Content and Route Checks

- New posts and Journal records must satisfy the shared Zod schema in
  src/content/config.ts and use a valid ISO date for pubDatetime.
- Listing routes should reuse getSortedPosts or a helper that delegates to it,
  so drafts and scheduled posts stay hidden.
- Dynamic routes must define getStaticPaths and provide the props expected by
  their layout. Check both post and numeric pagination paths in
  src/pages/posts/[slug]/index.astro.
- Journal routes must define the same published-entry and numeric pagination
  paths under /journal/ and keep Journal links out of blog-only Posts, Tags,
  and homepage data flows.
- When changing SITE, canonical URLs, OG rendering, or footer behavior, run both
  build:cn and build:overseas; PUBLIC_SITE_LINE changes the emitted hostname
  and domestic legal footer.
- Endpoint changes should be checked for the correct response type in
  rss.xml.ts, robots.txt.ts, and the PNG endpoints.

## Accessibility and Browser Behavior

Preserve the existing skip link, semantic landmarks, visible focus styles,
screen-reader labels, and keyboard-safe disabled-link behavior. If a component
uses view transitions, verify that astro:after-swap still restores menu, theme,
or post-detail interactions after navigation.

## Forbidden Patterns

- Committing code that only passes one site-line build.
- Adding any or bypassing content validation with a broad assertion.
- Exposing drafts or future-scheduled posts by filtering only on draft.
- Introducing client hydration for content that can be rendered at build time.
- Using hardcoded canonical hostnames or color values where shared config and
  skin tokens already provide them.
- Treating a disabled <a> as accessible; use the LinkButton.astro pattern.

## Review Checklist

Before considering a change complete, review:

1. The route/layout/component boundary matches the directory conventions.
2. Props and content entries remain typed and schema-backed.
3. Derived post data goes through the shared filter/sort/pagination helpers.
4. Metadata, canonical URLs, OG/RSS/robots output, and site-line behavior are
   still correct where affected.
5. Keyboard focus, labels, semantic landmarks, and view-transition listeners
   remain intact.
6. astro check, lint, format check, and both production builds pass.
