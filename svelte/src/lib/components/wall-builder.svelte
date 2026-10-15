<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";
  import Button from "./button.svelte";
  import Badge from "./badge.svelte";

  let n = $state(0);
</script>

<div class="bk-wall" role="img" aria-label="{n} of 24 bricks laid">
  {#each [0, 1, 2, 3] as r}
    <div class="bk-wall__row" class:is-odd={r % 2 === 1}>
      {#each [0, 1, 2, 3, 4, 5] as c}
        <span class:is-on={r * 6 + c < n}></span>
      {/each}
    </div>
  {/each}
</div>
<div class="bk-row">
  <Button size="sm" icon="plus" disabled={n >= 24} onclick={() => (n += 1)}>Lay brick</Button>
  <Button size="sm" onclick={() => (n = 0)}>Reset</Button>
  {#if n >= 24}
    <Badge>Wall done!</Badge>
  {:else}
    <span>{n}/24</span>
  {/if}
</div>
