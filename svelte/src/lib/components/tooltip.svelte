<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    text: string;
    children: Snippet;
  }
  let { text, children }: Props = $props();
</script>

<span class="bk-tip">
  {@render children()}
  <span class="bk-tip__bubble bk-cut" role="tooltip">{text}</span>
</span>
