<script lang="ts">
  interface Props {
    label?: string;
  }
  let { label = "Loading" }: Props = $props();
  const RING: Array<[number, number]> = [[1, 1], [1, 2], [1, 3], [2, 3], [3, 3], [3, 2], [3, 1], [2, 1]];
</script>

<span class="bk-spin-wrap" role="status">
  <span class="bk-brick-spin" aria-hidden="true">
    {#each RING as [r, c], i}
      <span style="grid-row: {r}; grid-column: {c}; animation-delay: {i * 0.1}s"></span>
    {/each}
  </span>
  {label}
</span>
