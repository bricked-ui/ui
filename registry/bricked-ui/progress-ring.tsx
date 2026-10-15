/** Progress ring - Pixel square ring gauge. */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const progressRingStyles = cva("bk-cut bg-ink text-on-dark", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-ink text-on-dark", dark: "bg-field text-ink" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

export interface ProgressRingProps extends React.ComponentProps<"div">, VariantProps<typeof progressRingStyles> {
  icon?: PixelIconName;
  iconPosition?: "left" | "right";
}

export function ProgressRing({ className, size, variant, icon, iconPosition = "left", children, ...props }: ProgressRingProps) {
  return (
    <div className={cn(progressRingStyles({ size, variant }), className)} {...props}>
      {icon && iconPosition === "left" && <PixelIcon name={icon} />}
      {children ? <span>{children}</span> : null}
      {icon && iconPosition === "right" && <PixelIcon name={icon} />}
    </div>
  );
}
