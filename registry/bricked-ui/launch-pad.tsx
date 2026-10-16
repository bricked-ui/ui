import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-sky bk-cut", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface LaunchPadProps extends React.ComponentProps<"div">, VariantProps<typeof s> { icon?: PixelIconInput; }
export function LaunchPad({ className, size, variant, icon = "rocket", ...props }: LaunchPadProps) {
  const [fly, setFly] = React.useState(false);
  return (<div className={cn(s({ size, variant }), className)} {...props}><div className="bk-sky bk-cut" aria-hidden="true"><span className={fly ? "bk-rocket is-fly" : "bk-rocket"}><PixelIcon icon={icon} /></span></div><button type="button" className="bricked-btn bricked-btn--sm" disabled={fly} onClick={() => { setFly(true); setTimeout(() => setFly(false), 1500); }}>Launch</button></div>);
}
