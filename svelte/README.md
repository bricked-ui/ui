# bricked-ui-svelte

Pixel-art brick UI for **Svelte 5** (runes) — a shadcn-svelte registry mirroring
the React registry in `ui/`. Same `bk-*` look, 50 registry items.

## Install via shadcn-svelte (recommended)

```sh
bun x shadcn-svelte@latest init   # once: creates $lib/utils (cn) + aliases
bun x shadcn-svelte@latest add https://bricked-ui.vercel.app/r-svelte/button.json
bun x shadcn-svelte@latest add https://bricked-ui.vercel.app/r-svelte/bricked-css.json
```

```svelte
<script>
  import Button from "$lib/components/ui/button.svelte";
</script>

<Button icon="rocket">Launch</Button>
```

Then `@import "$lib/bricked.css";` in `src/app.css` and add the pixel fonts
(Press Start 2P + VT323).

## Install via npm

```bash
bun add bricked-ui-svelte
# or npm i bricked-ui-svelte
```

Import the stylesheet once in your app:

```ts
import "bricked-ui-svelte/bricked.css";
import "@fontsource/press-start-2p"; // or Google Fonts link
```

## Use

```svelte
<script>
  import { Button, Card, PixelIcon } from "bricked-ui-svelte";
  import "bricked-ui-svelte/bricked.css";
</script>

<Card title="Hello builder">
  <Button icon="rocket">Launch</Button>
</Card>
```

## Components (50)

Core: `PixelIcon`, `Button`, `IconButton`, `Card`, `Badge`, `Alert`, `Banner`, `Toast`, `Stat`, `EmptyState`, `Divider`, `CodeBlock`

Forms: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Counter`, `Rating`, `SearchInput`, `Field`, `Chips`, `Keycap`, `Dropzone`, `Progress`

Nav/overlay: `Tabs`, `Accordion`, `Modal`, `Tooltip`, `Breadcrumbs`, `Pagination`, `DropdownMenu`, `Avatar`, `Stepper`, `ListGroup`

Data/feedback: `DataTable`, `RingLoader`, `StackingLoader`, `HealthMeter`, `Skeleton`, `Timeline`, `Calendar`

Fun: `Typewriter`, `Dice`, `WallBuilder`, `LikeButton`, `LaunchPad`, `Fortune`, `Clock`

All styling comes from `src/lib/bricked.css` (synced with `ui/registry/bricked-ui/bricked.css`) — framework-agnostic, no Tailwind required.

## Registry layout (mirrors `ui/` React side)

```
svelte/
  registry.json            # catalog: every item, its files and registryDependencies
  components.json          # shadcn-svelte aliases ($lib/components, $lib/utils, ...)
  src/lib/components/      # one kebab-case .svelte per component + icons.ts
  src/lib/utils.ts         # cn() — dev-local copy of what `init` creates as $lib/utils
  src/lib/bricked.css      # framework-agnostic bk-* stylesheet (dark mode included)
  src/lib/index.ts         # barrel for the npm package
  scripts/gen-registry.ts  # rebuild registry.json from ui/registry.json + sources
  scripts/build-registry.ts# emit website/public/r-svelte/*.json (shadcn-svelte shape)
```

`registry.json` titles/descriptions/grouping come from `ui/registry.json`
(single source of truth — React names). `local:<name>` deps become
`./<name>.json` in the built output; `$lib/utils` imports become the
`$UTILS$` placeholder, exactly like the official registry.

```sh
bun install
bun run check             # svelte-check
bun run gen-registry      # rebuild registry.json after adding/renaming sources
bun run registry:build    # emit ../../website/public/r-svelte/*.json
```

With Node ≥ 22 you can also run the official builder directly:
`shadcn-svelte registry build --output ../../website/public/r-svelte`.

## Notes vs React version

- React used `cva` + `cn` for `sm/md/lg`. Svelte `Button` keeps `size` prop mapping to `bricked-btn--sm/lg`.
- React state (`useState`) → Svelte 5 `$state` / `$bindable` runes. `value`, `checked`, `open`, `page` are bindable: `bind:value`, `bind:checked`, `bind:open`.
- `children` → Svelte `{@render children()}` snippets. `icon` prop takes a `PixelIconName`.
- `Modal` renders inline (no portal by default) — wrap in `<Teleport>`/portal action if inside a `bk-cut` clipped parent.
