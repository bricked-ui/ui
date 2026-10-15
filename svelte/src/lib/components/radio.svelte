<script lang="ts">
  interface Props {
    checked?: boolean;
    label?: string;
    name?: string;
    value?: string;
    [key: string]: unknown;
  }
  let { checked = $bindable(false), label, ...rest }: Props = $props();
  import PixelIcon from "./pixel-icon.svelte";
</script>

<label class="bk-check">
  <input type="radio" {checked} onchange={(e) => (checked = e.currentTarget.checked)} {...rest} />
  <span class="bk-check__box bk-round"><PixelIcon name="dot" /></span>
  {#if label}{label}{/if}
</label>
