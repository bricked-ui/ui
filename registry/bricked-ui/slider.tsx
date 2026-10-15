import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const s = cva("bk-slider bk-cut", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface BrickedSliderProps extends Omit<React.ComponentProps<"input">, "onChange" | "size">, VariantProps<typeof s> { value: number; onChange: (v: number) => void; icon?: PixelIconName; }
export function BrickedSlider({ className, size, variant, value, onChange, ...props }: BrickedSliderProps) {
  return (<input type="range" min={0} max={100} value={value} className={cn(s({ size, variant }), className)} style={{ "--v": value + "%" } as React.CSSProperties} onChange={e => onChange(Number(e.target.value))} {...props} />);
}
