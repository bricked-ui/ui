import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-clock bk-cut", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface CountdownProps extends React.ComponentProps<"div">, VariantProps<typeof s> { seconds: number; icon?: PixelIconInput; }
export function Countdown({ className, size, variant, seconds, ...props }: CountdownProps) {
  const [s2, setS] = React.useState(seconds);
  React.useEffect(() => { setS(seconds); const i = setInterval(() => setS(v => Math.max(0, v - 1)), 1000); return () => clearInterval(i); }, [seconds]);
  const h = Math.floor(s2 / 3600), m = Math.floor((s2 % 3600) / 60), s3 = s2 % 60;
  return (<div className={cn(s({ size, variant }), className)} role="timer" {...props}>{String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s3).padStart(2, "0")}</div>);
}
