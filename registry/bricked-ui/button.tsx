import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const button = cva(
  "bk-cut bk-bricks inline-flex items-center justify-center font-pixel text-ink " +
    "cursor-pointer select-none rounded-none border-0 leading-none " +
    "shadow-[inset_calc(var(--px)*-1)_calc(var(--px)*-1)_0_var(--color-shade)] " +
    "min-h-[calc(var(--px)*8)] px-[calc(var(--px)*7)] gap-[calc(var(--px)*2)] " +
    "hover:not-disabled:bg-brick-hover " +
    "active:not-disabled:translate-y-[var(--px)] active:not-disabled:shadow-[inset_var(--px)_var(--px)_0_var(--color-shade)] " +
    "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_var(--px)_var(--color-ink)] " +
    "disabled:cursor-not-allowed disabled:bg-none disabled:bg-[#b98a5e] disabled:text-[#4a3522] " +
    "disabled:shadow-[inset_calc(var(--px)*-1)_calc(var(--px)*-1)_0_#8a6540]",
  {
    variants: {
      size: {
        sm: "[--px:4px] [--cut:1.5px] [--brick:2px] [--icon:3px] text-[11px]",
        md: "[--px:6px] [--cut:2px] [--brick:3px] [--icon:4px] text-[14px]",
        lg: "[--px:8px] [--cut:3px] [--brick:4px] [--icon:5px] text-[18px]"
      }
    },
    defaultVariants: { size: "md" }
  }
);

export interface BrickedButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof button> {
  icon?: PixelIconName;
  iconPosition?: "left" | "right";
}

export function BrickedButton({
  className,
  size,
  icon,
  iconPosition = "left",
  children,
  ...props
}: BrickedButtonProps) {
  return (
    <button className={cn(button({ size }), className)} {...props}>
      {icon && iconPosition === "left" && <PixelIcon name={icon} />}
      <span>{children}</span>
      {icon && iconPosition === "right" && <PixelIcon name={icon} />}
    </button>
  );
}
