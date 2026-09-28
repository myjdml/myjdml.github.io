# Hook Guidelines

There are no custom use* hooks in this repository and no client-side data
fetching library. Most pages are static Astro output, so do not introduce a
hook for data that can be prepared in a route or utility.

## Existing React Hook Pattern

src/components/Search.tsx is the reference for React hooks:

- useRef<HTMLInputElement> owns the search input DOM reference.
- useState owns only the current input and Fuse result list.
- useMemo builds the Fuse index from the searchList prop and avoids recreating
  it on every keystroke.
- The first useEffect reads the initial q URL parameter and restores the cursor
  position.
- The second useEffect derives results for input longer than one character and
  synchronizes the query string with history.replaceState.

Keep browser-only APIs (window, history, URLSearchParams, and DOM references)
inside effects, event handlers, or a hydrated island. Do not run them while
Astro is rendering on the server.

## Astro Browser Scripts

Interactive behavior that does not need React stays in an Astro script or in a
public script:

- Header.astro toggles the mobile menu and rebinds it after astro:after-swap.
- PostDetails.astro binds scroll progress, heading links, copy buttons, and the
  back-to-top control.
- public/toggle-theme.js persists the theme in localStorage, reacts to
  prefers-color-scheme, and reinitializes after view-transition swaps.

When adding a listener to a page that uses view transitions, make the setup
function safe to call after astro:after-swap and avoid accumulating duplicate
listeners.

## Naming and Extraction

If a stateful behavior is truly reused by multiple React islands, extract a
focused useX hook beside the consuming components and type its inputs and return
value. A one-off behavior should remain local to its component, as the search
state is today. Do not create a hook merely to wrap a pure formatter or
collection transformation; those belong in src/utils/.

## Common Mistakes

- Calling getCollection or fetching a post from a React hook instead of passing
  a typed build-time prop.
- Reading window or localStorage during module evaluation of a component that
  may be rendered on the server.
- Hydrating an Astro component just to add a click listener that an Astro
  script can own.
- Forgetting to rebind browser behavior after an Astro view-transition swap.
