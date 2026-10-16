/** Collapsible - Single expand/collapse panel. */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const collapsibleStyles = cva("bk-cut bg-peach text-ink", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-peach text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

export interface CollapsibleProps extends React.ComponentProps<"div">, VariantProps<typeof collapsibleStyles> {
  icon?: PixelIconInput;
  iconPosition?: "left" | "right";
}

export function Collapsible({ className, size, variant, icon, iconPosition = "left", children, ...props }: CollapsibleProps) {
  return (
    <div className={cn(collapsibleStyles({ size, variant }), className)} {...props}>
      {icon && iconPosition === "left" && <PixelIcon icon={icon} />}
      {children ? <span>{children}</span> : null}
      {icon && iconPosition === "right" && <PixelIcon icon={icon} />}
    </div>
  );
}
