<script lang="ts">
  interface Props {
    value?: number;
    min?: number;
    max?: number;
    id?: string;
    onChange?: (v: number) => void;
  }
  let { value = $bindable(60), min = 0, max = 100, id, onChange }: Props = $props();
</script>

<input
  {id}
  type="range"
  {min}
  {max}
  bind:value
  class="bk-slider bk-cut"
  style="--v: {(value / max) * 100}%"
  oninput={(e) => onChange?.(Number(e.currentTarget.value))}
/>
