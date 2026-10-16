<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";
  import type { PixelIconInput } from "./icons.js";
  import { cn } from "$lib/utils.js";

  interface Props {
    icon: PixelIconInput;
    label: string;
    dot?: boolean;
    class?: string;
    onclick?: (e: MouseEvent) => void;
  }
  let { icon, label, dot = false, class: cls = "", onclick, ...rest }: Props = $props();
</script>

<button type="button" aria-label={label} class={cn("bk-ibtn bk-cut", cls)} {onclick} {...rest}>
  <PixelIcon icon={icon} />
  {#if dot}
    <span class="bk-ibtn__dot" aria-hidden="true"></span>
  {/if}
</button>
