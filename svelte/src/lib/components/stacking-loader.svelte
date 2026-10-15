<script lang="ts">
  interface Props {
    label?: string;
  }
  let { label = "Stacking" }: Props = $props();
</script>

<span class="bk-spin-wrap" role="status">
  <span class="bk-stack-load" aria-hidden="true">
    {#each [0, 1, 2] as i}
      <span style="animation-delay: {i * 0.3}s"></span>
    {/each}
  </span>
  {label}
</span>
