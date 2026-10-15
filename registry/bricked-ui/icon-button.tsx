/** Icon button - 48px square brick icon button with notification dot. */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const iconButtonStyles = cva("bk-cut bk-bricks inline-flex items-center justify-center font-pixel text-ink cursor-pointer select-none rounded-none border-0 leading-none min-h-[calc(var(--px)*8)] px-[calc(var(--px)*7)] gap-[calc(var(--px)*2)]", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

export interface IconButtonProps extends React.ComponentProps<"button">, VariantProps<typeof iconButtonStyles> {
  icon?: PixelIconName;
  iconPosition?: "left" | "right";
}

export function IconButton({ className, size, variant, icon, iconPosition = "left", children, ...props }: IconButtonProps) {
  return (
    <button className={cn(iconButtonStyles({ size, variant }), className)} {...props}>
      {icon && iconPosition === "left" && <PixelIcon name={icon} />}
      {children ? <span>{children}</span> : null}
      {icon && iconPosition === "right" && <PixelIcon name={icon} />}
    </button>
  );
}
