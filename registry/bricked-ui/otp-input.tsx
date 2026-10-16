import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-otp", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface OtpInputProps extends Omit<React.ComponentProps<"div">, "onChange">, VariantProps<typeof s> { length?: number; value: string; onChange: (v: string) => void; icon?: PixelIconInput; }
export function OtpInput({ className, size, variant, length = 4, value, onChange, ...props }: OtpInputProps) {
  return (<div className={cn(s({ size, variant }), "flex gap-2", className)} {...props}>{Array.from({ length }, (_, i) => (<input key={i} className="bk-input bk-cut w-12 text-center" maxLength={1} value={value[i] ?? ""} onChange={e => onChange(value.slice(0, i) + e.target.value.slice(-1) + value.slice(i + 1))} aria-label={"Digit " + (i + 1)} />))}</div>);
}
