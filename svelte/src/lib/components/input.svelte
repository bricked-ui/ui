<script lang="ts">
  import { cn } from "$lib/utils.js";

  interface Props {
    value?: string;
    placeholder?: string;
    id?: string;
    type?: string;
    class?: string;
    oninput?: (e: Event & { currentTarget: HTMLInputElement }) => void;
    [key: string]: unknown;
  }
  let { value = $bindable(""), class: cls = "", ...rest }: Props = $props();
</script>

<input bind:value class={cn("bk-input bk-cut", cls)} {...rest} />
