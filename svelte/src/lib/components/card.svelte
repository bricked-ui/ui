<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils.js";

  interface Props {
    title?: string;
    class?: string;
    children: Snippet;
  }
  let { title, class: cls = "", children, ...rest }: Props = $props();
</script>

<section class={cn("bk-card bk-cut", cls)} {...rest}>
  {#if title}
    <header class="bk-card__head">{title}</header>
  {/if}
  <div class="bk-card__body">
    {@render children()}
  </div>
</section>
