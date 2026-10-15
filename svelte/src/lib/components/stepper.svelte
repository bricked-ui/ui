<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    steps: string[];
    current?: number;
  }
  let { steps, current = 0 }: Props = $props();
</script>

<ol class="bk-steps">
  {#each steps as s, i}
    {@const st = i < current ? "done" : i === current ? "now" : "todo"}
    <li class="bk-step bk-step--{st}" aria-current={st === "now" ? "step" : undefined}>
      <span class="bk-step__box bk-cut">
        {#if st === "done"}
          <PixelIcon name="check" />
        {:else}
          {i + 1}
        {/if}
      </span>
      <span>{s}</span>
    </li>
    {#if i < steps.length - 1}
      <li aria-hidden="true" class="bk-step__line" class:is-done={i < current}></li>
    {/if}
  {/each}
</ol>
