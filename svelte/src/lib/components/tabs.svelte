<script lang="ts">
  interface Props {
    items: string[];
    value?: string;
    onChange?: (t: string) => void;
  }
  let { items, value = $bindable(items[0]), onChange }: Props = $props();
</script>

<div class="bk-tabs" role="tablist">
  {#each items as t}
    <button
      type="button"
      role="tab"
      aria-selected={value === t}
      class="bk-tab bk-cut"
      onclick={() => {
        value = t;
        onChange?.(t);
      }}
    >
      {t}
    </button>
  {/each}
</div>
