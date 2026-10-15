<script lang="ts">
  import type { Snippet } from "svelte";
  import PixelIcon from "./pixel-icon.svelte";
  import type { PixelIconName } from "./icons.js";
  import { cn } from "$lib/utils.js";

  interface Props {
    size?: "sm" | "md" | "lg";
    icon?: PixelIconName;
    iconPosition?: "left" | "right";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    class?: string;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    size = "md",
    icon,
    iconPosition = "left",
    type = "button",
    disabled = false,
    class: cls = "",
    onclick,
    children,
    ...rest
  }: Props = $props();
</script>

<button
  {type}
  {disabled}
  class={cn("bricked-btn", size !== "md" && `bricked-btn--${size}`, cls)}
  {onclick}
  {...rest}
>
  {#if icon && iconPosition === "left"}
    <PixelIcon name={icon} />
  {/if}
  <span>{@render children()}</span>
  {#if icon && iconPosition === "right"}
    <PixelIcon name={icon} />
  {/if}
</button>
