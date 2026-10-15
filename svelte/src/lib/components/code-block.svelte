<script lang="ts">
  import { cn } from "$lib/utils.js";

  interface Props {
    code: string;
    class?: string;
  }
  // Tiny highlighter: keywords orange, strings accent. Keeps it dependency-free like React version.
  let { code, class: cls = "" }: Props = $props();

  function highlight(src: string): string {
    const esc = src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc
      .replace(/(&quot;.*?&quot;|"[^"]*"|'[^']*')/g, '<span class="bk-code__s">$1</span>')
      .replace(
        /\b(const|let|var|function|return|import|from|export|build|if|else|for|while)\b/g,
        '<span class="bk-code__k">$1</span>'
      );
  }
</script>

<pre class={cn("bk-code bk-cut", cls)}><code>{@html highlight(code)}</code></pre>
