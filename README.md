# Bricked UI - registry + Svelte

The shadcn registry source for Bricked UI: 92 pixel-art components for React,
plus a Svelte 5 port (50 components) under `svelte/`.
This repo holds the **source**. The built JSON is published through the
[website](https://github.com/bricked-ui/website) at
`https://bricked-ui.vercel.app/r/`.

## Layout

```
ui/
  registry.json            # catalog: every item, its files and dependencies
  components.json          # shadcn aliases (@/components, @/lib/utils, ...)
  registry/bricked-ui/     # one .tsx per component + pixel-icon, styles
  svelte/                  # Svelte 5 port (bun + svelte-check + svelte-package)
    package.json           # name: bricked-ui-svelte
    src/lib/components/    # one .svelte per component (PixelIcon, Button, ...)
    src/lib/icons.ts       # ICONS grid + PixelIconName
    src/lib/utils.ts       # cn()
    src/lib/bricked.css    # framework-agnostic bk-* stylesheet (mirrors registry bricked.css)
    src/lib/index.ts       # barrel exports
  lib/utils.ts             # cn() (React)
  DESIGN.md                # the full style specification
```

## Install a piece

React (shadcn):

```sh
bunx shadcn registry add @bricked=https://bricked-ui.vercel.app/r/{name}.json  # once
bunx shadcn add @bricked/button
```

Svelte:

```sh
bun add bricked-ui-svelte   # or copy ui/svelte/src/lib/components/*.svelte
```

```svelte
<script>
  import { Button } from "bricked-ui-svelte";
  import "bricked-ui-svelte/bricked.css";
</script>

<Button icon="rocket">Launch</Button>
```

Or without a namespace:

```sh
bunx shadcn add https://bricked-ui.vercel.app/r/button.json
```

## Add a component

1. Drop `my-thing.tsx` into `registry/bricked-ui/`, following the house
   pattern: `cva` variants (`size: sm/md/lg`, `variant: primary/dark`),
   an `icon` prop (any `PixelIconInput` — registry name or custom grid), `className` merged with `cn()`.
2. Register it in `registry.json` (`name`, `type`, `title`, `description`,
   `files` with paths relative to `ui/`, plus `dependencies` /
   `registryDependencies` as needed). Related files ship as one item -
   presets are usage examples, not items.
3. Validate and publish the JSON:

```sh
bun install
bun run check   # tsc --noEmit over registry + lib
bun run build   # shadcn build --output ../website/public/r
```

`bun run build` writes one JSON per item plus the catalog straight into the
website repo, so the site serves exactly what was validated here.

## Conventions

- No border-radius, no borders, no blur - depth comes from hard inset bevels.
- Corners are cut staircases (`bk-cut`); motion is `steps()` only.
- Text on orange is always ink (`#2b1100`), never white.
- Icons are 7x7 crisp grids (`pixel-icon.tsx`; brand marks are the 16x16
  exceptions) — 268 glyphs in the registry, including brand marks
  (`youtube`, `discord`, `x`, `instagram`, `spotify`, …). `PixelIcon` also renders
  caller-supplied `PixelIconGrid` rows (`grid` prop), and every `icon` prop
  takes `PixelIconInput` (name or grid). New glyphs must follow the same rules.
- See `DESIGN.md` for the complete spec: tokens, pixel units, motion,
  per-component recipes and the new-component checklist.
