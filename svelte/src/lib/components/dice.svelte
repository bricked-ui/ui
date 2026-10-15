<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";
  import Button from "./button.svelte";

  const PIPS: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };

  let face = $state(5);
  let rolling = $state(false);

  function roll() {
    rolling = true;
    let k = 0;
    const t = setInterval(() => {
      face = 1 + Math.floor(Math.random() * 6);
      if (++k >= 8) {
        clearInterval(t);
        rolling = false;
      }
    }, 90);
  }
</script>

<div class="bk-row">
  <div class="bk-die bk-cut" role="img" aria-label="Die showing {face}">
    {#each Array.from({ length: 9 }, (_, i) => i) as i}
      <span class:is-on={PIPS[face].includes(i)}></span>
    {/each}
  </div>
  <Button size="sm" disabled={rolling} onclick={roll}>Roll</Button>
  <span>You got {face}</span>
</div>
