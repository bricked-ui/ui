import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-die bk-cut grid place-items-center", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface CoinFlipProps extends React.ComponentProps<"button">, VariantProps<typeof s> { icon?: PixelIconInput; }
export function CoinFlip({ className, size, variant, icon = "star", ...props }: CoinFlipProps) {
  const [side, setSide] = React.useState(0);
  return (<button type="button" className={cn(s({ size, variant }), className)} onClick={() => setSide(Math.floor(Math.random() * 2))} {...props}><PixelIcon icon={side === 0 ? icon : "dot"} /></button>);
}
