import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const ANSWERS = ["Lay one more brick.", "Ask again after a snack.", "Yes, build it.", "The wall says no.", "Take a break first.", "Orange is always right."];
const s = cva("bk-answer bk-cut", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface FortuneProps extends React.ComponentProps<"div">, VariantProps<typeof s> { icon?: PixelIconName; }
export function Fortune({ className, size, variant, icon = "star", ...props }: FortuneProps) {
  const [a, setA] = React.useState("Ask me anything.");
  return (<div className={cn(s({ size, variant }), className)} {...props}><div className="bk-answer bk-cut" aria-live="polite">{a}</div><button type="button" className="bricked-btn bricked-btn--sm" onClick={() => setA(ANSWERS[Math.floor(Math.random() * ANSWERS.length)])}><PixelIcon name={icon} />Ask</button></div>);
}
