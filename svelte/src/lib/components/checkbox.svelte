<script lang="ts">
  import type { Snippet } from "svelte";
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    checked?: boolean;
    label?: string | Snippet;
    [key: string]: unknown;
  }
  let { checked = $bindable(false), label, ...rest }: Props = $props();
</script>

<label class="bk-check">
  <input type="checkbox" bind:checked {...rest} />
  <span class="bk-check__box bk-cut"><PixelIcon name="check" /></span>
  {#if typeof label === "string"}
    {label}
  {:else if label}
    {@render label()}
  {/if}
</label>
