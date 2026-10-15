<script lang="ts">
  import type { Snippet } from "svelte";
  import PixelIcon from "./pixel-icon.svelte";

  interface Item {
    title: string;
    body: string | Snippet;
  }
  interface Props {
    items: Item[];
    open?: number;
    onToggle?: (i: number) => void;
  }
  let { items, open = $bindable(0), onToggle }: Props = $props();
</script>

<div class="bk-acc">
  {#each items as it, i}
    <div>
      <button
        type="button"
        aria-expanded={open === i}
        class="bk-acc__btn bk-cut"
        onclick={() => {
          open = open === i ? -1 : i;
          onToggle?.(open);
        }}
      >
        {it.title}
        <PixelIcon name="down" />
      </button>
      {#if open === i}
        {#if typeof it.body === "string"}
          <p class="bk-acc__body">{it.body}</p>
        {:else}
          <div class="bk-acc__body">{@render it.body()}</div>
        {/if}
      {/if}
    </div>
  {/each}
</div>
