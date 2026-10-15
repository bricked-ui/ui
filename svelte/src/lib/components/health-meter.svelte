<script lang="ts">
  interface Props {
    value?: number;
    max?: number;
  }
  let { value = 7, max = 10 }: Props = $props();
</script>

<div class="bk-meter">
  <p class="bk-meter__label">HP {value}/{max}</p>
  <div class="bk-meter__bar" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
    {#each Array.from({ length: max }, (_, i) => i) as i}
      <span class:is-on={i < value}></span>
    {/each}
  </div>
</div>
