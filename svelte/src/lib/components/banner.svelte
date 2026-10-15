<script lang="ts">
  import type { Snippet } from "svelte";
  import PixelIcon from "./pixel-icon.svelte";
  import { cn } from "$lib/utils.js";

  interface Props {
    class?: string;
    onclose?: () => void;
    children: Snippet;
  }
  let { class: cls = "", onclose, children, ...rest }: Props = $props();
</script>

<div class={cn("bk-banner bk-cut", cls)} role="status" {...rest}>
  <PixelIcon name="star" />
  <span>{@render children()}</span>
  {#if onclose}
    <button type="button" aria-label="Dismiss" class="bk-x" onclick={onclose}>
      <PixelIcon name="close" />
    </button>
  {/if}
</div>
