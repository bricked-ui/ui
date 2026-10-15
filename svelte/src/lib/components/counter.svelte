<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    onChange?: (v: number) => void;
  }
  let { value = $bindable(0), min = 0, max = 9, onChange }: Props = $props();

  function step(d: number) {
    const v = Math.min(max, Math.max(min, value + d));
    value = v;
    onChange?.(v);
  }
</script>

<div class="bk-count">
  <button type="button" aria-label="Less" class="bk-page bk-cut" disabled={value <= min} onclick={() => step(-1)}>
    <PixelIcon name="minus" />
  </button>
  <span class="bk-count__val bk-cut" aria-live="polite">{value}</span>
  <button type="button" aria-label="More" class="bk-page bk-cut" disabled={value >= max} onclick={() => step(1)}>
    <PixelIcon name="plus" />
  </button>
</div>
