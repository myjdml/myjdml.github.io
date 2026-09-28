# Frontend Development Guidelines

These guidelines describe the current architecture and coding patterns of the
Astro blog in this repository. They are source-backed guidance for future
feature work and reviews; they are not a generic Astro template.

## Architecture at a Glance

The site is a static Astro build driven by the typed blog content collection.
Routes load and derive content, layouts compose the page shell, components
render reusable markup, and utilities contain pure transformations. React is
limited to server-rendered display components and the hydrated search island.
PUBLIC_SITE_LINE produces domestic and overseas builds from the same source.

Read [Project Architecture](./architecture.md) before changes that touch
routes, content flow, generated assets, or deployment.

## Guidelines Index

| Guide | Description | Status |
| --- | --- | --- |
| [Project Architecture](./architecture.md) | Runtime layers, content flow, build variants, and deployment | Maintained |
| [Directory Structure](./directory-structure.md) | Route, layout, component, utility, and content organization | Maintained |
| [Component Guidelines](./component-guidelines.md) | Astro/React boundaries, props, composition, styling, accessibility | Maintained |
| [Hook Guidelines](./hook-guidelines.md) | Existing React hooks and Astro browser scripts | Maintained |
| [State Management](./state-management.md) | Build-time data, local island state, URL state, and theme state | Maintained |
| [Quality Guidelines](./quality-guidelines.md) | Static checks, dual builds, content validation, and review checklist | Maintained |
| [Type Safety](./type-safety.md) | Strict TypeScript, content entry types, schemas, and assertions | Maintained |

## Working Rule

When a change crosses route, layout, component, content, or deployment
boundaries, start with the architecture guide and then load the narrower guide
for each affected area. Keep examples and rules synchronized with the source;
update this index if the spec file set changes.
