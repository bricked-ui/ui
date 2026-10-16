/** Toggle - Single on/off brick toggle. */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const toggleStyles = cva("bk-cut bg-field text-ink", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-field text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

export interface ToggleProps extends React.ComponentProps<"div">, VariantProps<typeof toggleStyles> {
  icon?: PixelIconInput;
  iconPosition?: "left" | "right";
}

export function Toggle({ className, size, variant, icon, iconPosition = "left", children, ...props }: ToggleProps) {
  return (
    <div className={cn(toggleStyles({ size, variant }), className)} {...props}>
      {icon && iconPosition === "left" && <PixelIcon icon={icon} />}
      {children ? <span>{children}</span> : null}
      {icon && iconPosition === "right" && <PixelIcon icon={icon} />}
    </div>
  );
}
