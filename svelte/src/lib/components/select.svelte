<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";
  import { cn } from "$lib/utils.js";

  interface Props {
    value?: string;
    options: string[];
    class?: string;
    onchange?: (v: string) => void;
  }
  let { value = $bindable(""), options, class: cls = "", onchange, ...rest }: Props = $props();
</script>

<div class="bk-select">
  <select
    bind:value
    class={cn("bk-input bk-cut", cls)}
    onchange={(e) => onchange?.(e.currentTarget.value)}
    {...rest}
  >
    {#each options as o}
      <option value={o}>{o}</option>
    {/each}
  </select>
  <PixelIcon name="down" />
</div>
