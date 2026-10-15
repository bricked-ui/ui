<script lang="ts">
  import type { Snippet } from "svelte";
  import PixelIcon from "./pixel-icon.svelte";

  interface Props {
    title: string;
    open?: boolean;
    onClose?: () => void;
    children: Snippet;
  }
  let { title, open = $bindable(false), onClose, children }: Props = $props();

  function close() {
    open = false;
    onClose?.();
  }

  $effect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  });
</script>

{#if open}
  <div class="bk-overlay" onclick={close} onkeydown={(e) => e.key === "Escape" && close()} role="presentation">
    <div
      class="bk-modal bk-cut"
      role="dialog"
      tabindex={-1}
      aria-modal="true"
      aria-label={title}
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
    >
      <header class="bk-card__head bk-modal__head">
        {title}
        <button type="button" aria-label="Close" class="bk-x" onclick={close}>
          <PixelIcon name="close" />
        </button>
      </header>
      <div class="bk-card__body">
        {@render children()}
      </div>
    </div>
  </div>
{/if}
