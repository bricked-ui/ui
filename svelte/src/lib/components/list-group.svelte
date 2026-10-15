<script lang="ts">
  interface Props {
    items: string[];
    value?: string;
    onChange?: (it: string) => void;
  }
  let { items, value = $bindable(items[0]), onChange }: Props = $props();
</script>

<ul class="bk-list">
  {#each items as it}
    <li>
      <button
        type="button"
        aria-pressed={it === value}
        class="bk-list__btn bk-cut"
        onclick={() => {
          value = it;
          onChange?.(it);
        }}>{it}</button
      >
    </li>
  {/each}
</ul>
