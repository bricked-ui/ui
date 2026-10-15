<script lang="ts">
  import type { Snippet } from "svelte";
  import PixelIcon from "./pixel-icon.svelte";
  import { cn } from "$lib/utils.js";

  interface Props {
    title: string;
    class?: string;
    children: Snippet;
  }
  let { title, class: cls = "", children, ...rest }: Props = $props();
</script>

<div class={cn("bk-alert bk-cut", cls)} role="alert" {...rest}>
  <PixelIcon name="alert" />
  <div>
    <p class="bk-alert__title">{title}</p>
    <p>{@render children()}</p>
  </div>
</div>
