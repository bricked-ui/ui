<script lang="ts">
  import { ICONS, type PixelIconName } from "./icons.js";

  interface Props {
    name: PixelIconName;
    class?: string;
  }

  let { name, class: cls = "" }: Props = $props();

  const grid = $derived(ICONS[name]);
  const cols = $derived(grid[0].length);
  const rows = $derived(grid.length);
</script>

<svg
  class="bricked-icon {cls}"
  style="width: calc(var(--icon, 4px) * {cols}); height: calc(var(--icon, 4px) * {rows});"
  viewBox="0 0 {cols} {rows}"
  shape-rendering="crispEdges"
  aria-hidden="true"
>
  {#each grid as row, y}
    {#each [...row] as cell, x}
      {#if cell === "1"}
        <rect x={x} y={y} width={1} height={1} fill="currentColor" />
      {/if}
    {/each}
  {/each}
</svg>
