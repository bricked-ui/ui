<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    icon?: import("./icons.js").PixelIconInput;
    dark?: boolean;
    children?: import("svelte").Snippet;
  }
  let { icon, dark = false, children }: Props = $props();
</script>

<span class="bk-avatar bk-cut" class:bk-avatar--dark={dark}>
  {#if icon}<PixelIcon icon={icon} />
  {:else if children}{@render children()}
  {/if}
</span>
