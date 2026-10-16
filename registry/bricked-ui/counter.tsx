import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-count", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface CounterProps extends Omit<React.ComponentProps<"div">, "onChange">, VariantProps<typeof s> { value: number; onChange: (v: number) => void; min?: number; max?: number; icon?: PixelIconInput; }
export function Counter({ className, size, variant, value, onChange, min = 0, max = 9, ...props }: CounterProps) {
  return (<div className={cn(s({ size, variant }), className)} {...props}><button type="button" aria-label="Less" className="bk-page bk-cut" disabled={value <= min} onClick={() => onChange(value - 1)}><PixelIcon name="minus" /></button><span className="bk-count__val bk-cut" aria-live="polite">{value}</span><button type="button" aria-label="More" className="bk-page bk-cut" disabled={value >= max} onClick={() => onChange(value + 1)}><PixelIcon name="plus" /></button></div>);
}
