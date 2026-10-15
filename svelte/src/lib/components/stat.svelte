<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils.js";

  interface Props {
    label: string;
    value: string;
    class?: string;
    children?: Snippet;
  }
  let { label, value, class: cls = "", children, ...rest }: Props = $props();
</script>

<div class={cn("bk-stat bk-cut", cls)} {...rest}>
  <p>{label}</p>
  <p class="bk-stat__value">{value}</p>
  {#if children}
    {@render children()}
  {/if}
</div>
