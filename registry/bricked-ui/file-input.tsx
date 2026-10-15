/** File input - Compact file picker row. */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const fileInputStyles = cva("bk-cut bg-field text-ink", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-field text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

export interface FileInputProps extends React.ComponentProps<"div">, VariantProps<typeof fileInputStyles> {
  icon?: PixelIconName;
  iconPosition?: "left" | "right";
}

export function FileInput({ className, size, variant, icon, iconPosition = "left", children, ...props }: FileInputProps) {
  return (
    <div className={cn(fileInputStyles({ size, variant }), className)} {...props}>
      {icon && iconPosition === "left" && <PixelIcon name={icon} />}
      {children ? <span>{children}</span> : null}
      {icon && iconPosition === "right" && <PixelIcon name={icon} />}
    </div>
  );
}
