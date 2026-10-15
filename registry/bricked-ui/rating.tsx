import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const s = cva("bk-rate", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface RatingProps extends Omit<React.ComponentProps<"div">, "onChange">, VariantProps<typeof s> { value: number; onChange: (v: number) => void; icon?: PixelIconName; }
export function Rating({ className, size, variant, value, onChange, icon = "star", ...props }: RatingProps) {
  return (<div className={cn(s({ size, variant }), className)} role="radiogroup" aria-label="Rating" {...props}>{[1,2,3,4,5].map(n => (<button key={n} type="button" role="radio" aria-checked={value === n} aria-label={n + " stars"} className={n <= value ? "is-on" : ""} onClick={() => onChange(n)}><PixelIcon name={icon} /></button>))}</div>);
}
