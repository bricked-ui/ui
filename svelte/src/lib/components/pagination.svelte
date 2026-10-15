<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    page?: number;
    total?: number;
    onChange?: (n: number) => void;
  }
  let { page = $bindable(1), total = 5, onChange }: Props = $props();

  function go(n: number) {
    page = n;
    onChange?.(n);
  }
</script>

<nav class="bk-pages" aria-label="Pagination">
  <button type="button" aria-label="Previous page" class="bk-page bk-cut" disabled={page <= 1} onclick={() => go(page - 1)}>
    <PixelIcon name="left" />
  </button>
  {#each Array.from({ length: total }, (_, i) => i + 1) as n}
    <button
      type="button"
      aria-current={n === page ? "page" : undefined}
      class="bk-page bk-cut"
      class:is-on={n === page}
      onclick={() => go(n)}
    >
      {n}
    </button>
  {/each}
  <button type="button" aria-label="Next page" class="bk-page bk-cut" disabled={page >= total} onclick={() => go(page + 1)}>
    <PixelIcon name="right" />
  </button>
</nav>
