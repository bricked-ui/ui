/** Drawer - Side slide-over panel. */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const drawerStyles = cva("bk-cut bg-peach text-ink", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-peach text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

export interface DrawerProps extends React.ComponentProps<"div">, VariantProps<typeof drawerStyles> {
  icon?: PixelIconInput;
  iconPosition?: "left" | "right";
  title?: string;
}

export function Drawer({ className, size, variant, icon, iconPosition = "left", children, ...props }: DrawerProps) {
  return (
    <div className={cn(drawerStyles({ size, variant }), className)} {...props}>
      {icon && iconPosition === "left" && <PixelIcon icon={icon} />}
      {children ? <span>{children}</span> : null}
      {icon && iconPosition === "right" && <PixelIcon icon={icon} />}
    </div>
  );
}
