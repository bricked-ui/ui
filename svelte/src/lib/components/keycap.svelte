<script lang="ts">
  interface Props {
    keys: string[];
  }
  let { keys }: Props = $props();
</script>

<div class="bk-keys">
  {#each keys as k, i}
    {#if i > 0}<span>+</span>{/if}
    <kbd class="bk-key bk-cut">{k}</kbd>
  {/each}
</div>
