<script lang="ts">
  interface Props {
    value?: number;
    onchange?: (d: number) => void;
  }
  let { value = $bindable(15), onchange }: Props = $props();
  const cells: Array<number | null> = [null, null, null, ...Array.from({ length: 31 }, (_, i) => i + 1)];
</script>

<div class="bk-cal bk-cut">
  <p class="bk-cal__title">October 2026</p>
  <div class="bk-cal__grid">
    {#each ["M", "T", "W", "T", "F", "S", "S"] as d}
      <span class="bk-cal__dow">{d}</span>
    {/each}
    {#each cells as d, i}
      {#if d === null}
        <span></span>
      {:else}
        <button
          type="button"
          aria-pressed={d === value}
          class="bk-day"
          class:is-on={d === value}
          onclick={() => {
            value = d;
            onchange?.(d);
          }}>{d}</button
        >
      {/if}
    {/each}
  </div>
</div>
