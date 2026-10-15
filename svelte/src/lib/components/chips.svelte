<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    items: string[];
    value?: string[];
    onRemove?: (t: string) => void;
  }
  let { items = $bindable([]), onRemove }: Props = $props();

  function remove(t: string) {
    items = items.filter((x) => x !== t);
    onRemove?.(t);
  }
</script>

<div class="bk-chips">
  {#if items.length === 0}
    <span>No tags left</span>
  {:else}
    {#each items as t (t)}
      <span class="bk-chip bk-cut">
        {t}
        <button type="button" aria-label="Remove {t}" class="bk-x" onclick={() => remove(t)}>
          <PixelIcon name="close" />
        </button>
      </span>
    {/each}
  {/if}
</div>
