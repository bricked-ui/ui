<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";

  let on = $state(false);
  let n = $state(12);
</script>

<button
  type="button"
  aria-pressed={on}
  class="bk-like"
  class:is-on={on}
  onclick={() => {
    on = !on;
    n += on ? 1 : -1;
  }}
>
  <PixelIcon name="heart" />
  {n}
  {#if on}
    <span class="bk-burst" aria-hidden="true">
      {#each [0, 1, 2, 3] as i}<span></span>{/each}
    </span>
  {/if}
</button>
