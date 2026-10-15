<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";
  import Button from "./button.svelte";

  interface Props {
    label: string;
    items: string[];
    onPick?: (it: string) => void;
  }
  let { label, items, onPick }: Props = $props();
  let open = $state(false);
  let ref: HTMLDivElement | undefined = $state(undefined);

  $effect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (ref && !ref.contains(e.target as Node)) open = false;
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") open = false;
    };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  });
</script>

<div class="bk-menu" bind:this={ref}>
  <Button size="sm" icon="down" iconPosition="right" aria-haspopup="menu" aria-expanded={open} onclick={() => (open = !open)}>
    {label}
  </Button>
  {#if open}
    <div class="bk-menu__list bk-cut" role="menu">
      {#each items as it}
        <button
          type="button"
          role="menuitem"
          class="bk-menu__item"
          onclick={() => {
            onPick?.(it);
            open = false;
          }}>{it}</button
        >
      {/each}
    </div>
  {/if}
</div>
