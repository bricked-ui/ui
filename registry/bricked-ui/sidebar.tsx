import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const sidebarStyles = cva("bk-side bk-cut", {
  variants: {
    size: {
      sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]",
      md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]",
      lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]",
    },
    variant: {
      primary: "bg-peach text-ink",
      dark: "bg-ink text-on-dark",
    },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

export interface SidebarProps
  extends React.ComponentProps<"aside">,
    VariantProps<typeof sidebarStyles> {
  icon?: PixelIconName;
  title?: string;
  footer?: React.ReactNode;
}

export function Sidebar({
  className,
  size,
  variant,
  icon,
  title,
  footer,
  children,
  ...props
}: SidebarProps) {
  return (
    <aside className={cn(sidebarStyles({ size, variant }), className)} {...props}>
      {title && (
        <div className="bk-side__head">
          {icon && <PixelIcon name={icon} />}
          <span>{title}</span>
        </div>
      )}
      <div className="bk-side__body">{children}</div>
      {footer && <div className="bk-side__foot">{footer}</div>}
    </aside>
  );
}
