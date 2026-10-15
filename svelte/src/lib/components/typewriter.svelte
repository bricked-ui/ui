<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    text: string;
  }
  let { text }: Props = $props();
  let n = $state(0);

  $effect(() => {
    n = 0;
    const t = setInterval(() => {
      if (n >= text.length) clearInterval(t);
      else n += 1;
    }, 60);
    return () => clearInterval(t);
  });
</script>

<p class="bk-type" aria-label={text}>{text.slice(0, n)}<span class="bk-caret" aria-hidden="true"></span></p>
