<script lang="ts">
  import { cn } from "$lib/utils.js";

  interface Props {
    value?: string;
    class?: string;
    [key: string]: unknown;
  }
  let { value = $bindable(""), class: cls = "", ...rest }: Props = $props();
</script>

<textarea bind:value class={cn("bk-input bk-cut", cls)} {...rest}></textarea>
