import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const railStyles = cva("bk-rail bk-cut", {
  variants: {
    size: {
      sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]",
      md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]",
      lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]",
    },
    variant: {
      primary: "bg-ink text-on-dark",
      dark: "bg-ink text-on-dark",
    },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

export interface SidebarRailProps
  extends React.ComponentProps<"nav">,
    VariantProps<typeof railStyles> {}

export function SidebarRail({
  className,
  size,
  variant,
  children,
  ...props
}: SidebarRailProps) {
  return (
    <nav aria-label="Sidebar" className={cn(railStyles({ size, variant }), className)} {...props}>
      {children}
    </nav>
  );
}
