# State Management

This is a build-time content site. It has no global state library, server state
cache, or client-side store. Keep state at the narrowest layer that can own it
and derive everything else from typed content and configuration.

## State Categories

### Build-time content state

Routes load the blog collection and pass derived values down. The pure utilities
postFilter, getSortedPosts, getPostsByTag, getUniqueTags, and getPagination are
the state transformation layer. A new list should reuse these functions so
draft, schedule, sort, tag, and page behavior stays consistent.

### Local island state

SearchBar keeps the current input and Fuse results in React useState. Its state
is not shared with other pages; the query is reflected in the URL so a reload
can restore it.

### Browser preference state

public/toggle-theme.js owns the light/dark preference. It reads and writes the
theme local-storage key, falls back to prefers-color-scheme, and reflects the
result on html[data-theme]. Header.astro only exposes the button that toggles
this behavior.

### DOM interaction state

The mobile menu, scroll progress, heading links, copy buttons, and back-to-top
control are local DOM behavior in Header.astro and PostDetails.astro. They
should not be promoted to a shared store.

## Derived Data Rules

Prefer pure derivation over mutation. For example, getPostsByTag filters by
slugified tag and delegates ordering/filtering to getSortedPosts, while
getPagination slices an already sorted list using SITE.postPerPage.

When a route needs both a post detail and a pagination page, follow
src/pages/posts/[slug]/index.astro: static paths provide a post prop for a
detail and omit it for numeric page paths, then the route renders the matching
layout.

## When to Introduce Shared State

Do not add global state for content, theme, menu, or search; existing local
boundaries already cover those cases. A shared store would need a concrete
cross-page interaction requirement and a documented persistence/lifecycle owner
before it is introduced.

## Common Mistakes

- Filtering drafts in one route and forgetting the scheduled-publication rule.
- Duplicating sort or pagination logic in a component.
- Keeping a second in-memory copy of the search query instead of synchronizing
  the q URL parameter.
- Creating a global store for a button or DOM interaction used by one layout.
