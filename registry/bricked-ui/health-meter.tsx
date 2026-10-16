/** Health meter - Ten-segment HP bar. */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const healthMeterStyles = cva("bk-cut bg-ink text-on-dark", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-ink text-on-dark", dark: "bg-field text-ink" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

export interface HealthMeterProps extends React.ComponentProps<"div">, VariantProps<typeof healthMeterStyles> {
  icon?: PixelIconInput;
  iconPosition?: "left" | "right";
}

export function HealthMeter({ className, size, variant, icon, iconPosition = "left", children, ...props }: HealthMeterProps) {
  return (
    <div className={cn(healthMeterStyles({ size, variant }), className)} {...props}>
      {icon && iconPosition === "left" && <PixelIcon icon={icon} />}
      {children ? <span>{children}</span> : null}
      {icon && iconPosition === "right" && <PixelIcon icon={icon} />}
    </div>
  );
}
