<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    value?: number;
    onChange?: (v: number) => void;
  }
  let { value = $bindable(0), onChange }: Props = $props();
</script>

<div class="bk-rate" role="radiogroup" aria-label="Rating">
  {#each [1, 2, 3, 4, 5] as n}
    <button
      type="button"
      role="radio"
      aria-checked={value === n}
      aria-label="{n} stars"
      class:is-on={n <= value}
      onclick={() => {
        value = n;
        onChange?.(n);
      }}
    >
      <PixelIcon name="star" />
    </button>
  {/each}
</div>

<style>
  .is-on {
    color: var(--ink);
  }
</style>
