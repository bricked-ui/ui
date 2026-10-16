<script lang="ts">
  import type { Snippet } from "svelte";
  import PixelIcon from "./pixel-icon.svelte";
  import type { PixelIconInput } from "./icons.js";
  import { cn } from "$lib/utils.js";

  interface Props {
    icon: PixelIconInput;
    title: string;
    action?: Snippet;
    class?: string;
    children: Snippet;
  }
  let { icon, title, action, class: cls = "", children, ...rest }: Props = $props();
</script>

<div class={cn("bk-empty bk-cut", cls)} {...rest}>
  <PixelIcon icon={icon} />
  <p class="bk-empty__title">{title}</p>
  <p>{@render children()}</p>
  {#if action}
    {@render action()}
  {/if}
</div>
