<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils.js";

  interface Props {
    class?: string;
    children: Snippet;
  }
  let { class: cls = "", children, ...rest }: Props = $props();
</script>

<div class={cn("bk-divider", cls)} role="separator" {...rest}>
  {@render children()}
</div>
