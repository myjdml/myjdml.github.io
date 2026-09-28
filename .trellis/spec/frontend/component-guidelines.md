# Component Guidelines

Astro components are the default. They render the static shell and receive
already-derived data from routes or layouts. React is reserved for components
that use React rendering or browser state; Search.tsx is the only hydrated
island and is mounted with client:load in src/pages/search.astro.

## Component Structure

Astro components follow the local frontmatter pattern:

    ---
    export interface Props {
      noMarginTop?: boolean;
    }

    const { noMarginTop = false } = Astro.props;
    ---

    <footer class={noMarginTop ? "" : "mt-auto"}>
      <slot />
    </footer>

Footer.astro, Pagination.astro, and Tag.astro are representative small
components. Keep imports and prop preparation above the frontmatter boundary,
markup below it, and component-only Tailwind rules in a scoped style block when
utility classes would become difficult to read.

React components export an explicit props interface and use typed content
entries. Card.tsx accepts CollectionEntry<"blog">["data"]; Datetime.tsx keeps
date formatting in the component while callers provide the date values.

## Props and Composition

- Export interface Props from .astro and React components.
- Destructure Astro.props with defaults at the top of an Astro component.
- Pass content through <slot /> when the component is a wrapper (Layout,
  Main, AboutLayout).
- Use discriminated unions when markup has genuinely different prop shapes;
  Main.astro uses "titleTransition" in props for its string-title versus
  tuple-title variants.
- Compose existing primitives. Pages and layouts already use Header, Footer,
  LinkButton, Card, Pagination, Tag, and Datetime; a new feature should reuse
  those boundaries before adding another near-duplicate.

Data fetching and collection filtering belong in routes and utilities. A leaf
component should not call getCollection, inspect Astro.params, or recreate the
draft/scheduled-post rules.

## Styling Patterns

Tailwind utilities are the primary styling tool. Use the project skin tokens
(text-skin-base, text-skin-accent, bg-skin-fill, border-skin-line, and related
classes) so light/dark themes continue to work. Global tokens, typography,
focus styles, and shared element defaults live in src/styles/base.css;
component-specific layout rules live in the component's scoped style block.

tailwind.config.cjs defines the skin colors from CSS variables and the
typography plugin. Do not hardcode a light or dark color in ordinary UI markup
when a skin token exists.

## Accessibility

Follow the patterns already used in Header.astro, Breadcrumbs.astro,
Datetime.tsx, and Search.tsx:

- Keep a skip link to #main-content and one semantic <main> per page.
- Use semantic nav, article, ul, and heading elements for structure.
- Give icon-only controls an aria-label or a visually hidden text label.
- Mark decorative SVGs and separators aria-hidden="true".
- Preserve visible keyboard focus through the shared focus-outline and
  focus-visible styles.
- Use aria-current="page", aria-expanded, aria-controls, and aria-disabled
  where the component's state needs to be announced.

LinkButton.astro renders a disabled link as a non-link <span> with aria-disabled;
use it instead of adding a disabled attribute to <a>.

## Common Mistakes

- Hydrating a static component without a browser interaction requirement.
- Passing an untyped content object or raw frontmatter instead of
  CollectionEntry<"blog">["data"].
- Repeating page metadata or content filtering inside a card or tag link.
- Styling with hardcoded colors that bypass the skin variables.
- Adding an icon-only link without the screen-reader text used by Socials and
  ShareLinks.
