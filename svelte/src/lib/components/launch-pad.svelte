<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";
  import Button from "./button.svelte";

  let fly = $state(false);
</script>

<div class="bk-sky bk-cut" aria-hidden="true">
  <span class="bk-rocket" class:is-fly={fly}><PixelIcon name="rocket" /></span>
</div>
<Button
  size="sm"
  icon="rocket"
  disabled={fly}
  onclick={() => {
    fly = true;
    setTimeout(() => (fly = false), 1500);
  }}>Launch</Button
>
