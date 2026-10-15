<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    id?: string;
    value?: string;
    placeholder?: string;
  }
  let { id, value = $bindable(""), placeholder = "Search", ...rest }: Props = $props();
</script>

<div class="bk-search">
  <input {id} type="search" bind:value class="bk-input bk-cut" {placeholder} {...rest} />
  <PixelIcon name="search" />
</div>
