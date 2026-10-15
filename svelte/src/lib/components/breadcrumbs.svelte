<script lang="ts">
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    items: string[];
    current: string;
    onclick?: (item: string) => void;
  }
  let { items, current, onclick }: Props = $props();
</script>

<nav aria-label="Breadcrumb">
  <ol class="bk-crumbs">
    {#each items as it, i}
      <li class="bk-crumbs__item">
        {#if i > 0}<PixelIcon name="right" />{/if}
        {#if i === items.length - 1}
          <span class="bk-crumb--current bk-cut" aria-current="page">{it}</span>
        {:else}
          <a
            href="#{it}"
            onclick={(e) => {
              e.preventDefault();
              onclick?.(it);
            }}>{it}</a
          >
        {/if}
      </li>
    {/each}
  </ol>
</nav>
