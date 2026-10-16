import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-like", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface LikeButtonProps extends React.ComponentProps<"button">, VariantProps<typeof s> { icon?: PixelIconInput; count?: number; }
export function LikeButton({ className, size, variant, icon = "heart", count = 12, ...props }: LikeButtonProps) {
  const [on, setOn] = React.useState(false);
  const [n, setN] = React.useState(count);
  return (<button type="button" aria-pressed={on} className={cn(s({ size, variant }), on && "is-on", className)} onClick={() => { setOn(!on); setN(n + (on ? -1 : 1)); }} {...props}><PixelIcon icon={icon} />{n}{on && <span className="bk-burst" aria-hidden="true">{[0,1,2,3].map(i => <span key={i} />)}</span>}</button>);
}
