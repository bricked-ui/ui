<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils.js";

  interface Props {
    dark?: boolean;
    class?: string;
    children: Snippet;
  }
  let { dark = false, class: cls = "", children, ...rest }: Props = $props();
</script>

<span class={cn("bk-badge bk-cut", dark && "bk-badge--dark", cls)} {...rest}>
  {@render children()}
</span>
