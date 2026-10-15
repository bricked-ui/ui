<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    label: string;
    id?: string;
    children: Snippet;
  }
  let { label, id, children }: Props = $props();
</script>

<div class="bk-field">
  <label class="bk-label" for={id}>{label}</label>
  {@render children()}
</div>
