<script lang="ts">
  import {
    resolvePixelGrid,
    type PixelIconGrid,
    type PixelIconInput,
    type PixelIconName,
  } from "./icons.js";

  interface Props {
    /** Registry icon name. Kept for back-compat — `icon` does the same plus custom grids. */
    name?: PixelIconName;
    /** Custom pixel grid. Wins over `icon`/`name` when provided. */
    grid?: PixelIconGrid;
    /** Registry name or custom grid. Wins over `name` when provided. */
    icon?: PixelIconInput;
    class?: string;
  }

  let { name, grid, icon, class: cls = "" }: Props = $props();

  const resolved = $derived(
    grid ??
      (icon !== undefined ? resolvePixelGrid(icon) : undefined) ??
      (name ? resolvePixelGrid(name) : undefined)
  );
  const cols = $derived(
    resolved ? Math.max(...resolved.map((r) => r.length)) : 0
  );
  const rows = $derived(resolved ? resolved.length : 0);
</script>

{#if resolved}
  <svg
    class="bricked-icon {cls}"
    style="width: calc(var(--icon, 4px) * {cols}); height: calc(var(--icon, 4px) * {rows});"
    viewBox="0 0 {cols} {rows}"
    shape-rendering="crispEdges"
    aria-hidden="true"
  >
    {#each resolved as row, y}
      {#each [...row] as cell, x}
        {#if cell === "1"}
          <rect x={x} y={y} width={1} height={1} fill="currentColor" />
        {/if}
      {/each}
    {/each}
  </svg>
{/if}
