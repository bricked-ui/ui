import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-cal bk-cut", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface CalendarProps extends Omit<React.ComponentProps<"div">, "onChange">, VariantProps<typeof s> { value: number; onChange: (d: number) => void; icon?: PixelIconInput; }
export function Calendar({ className, size, variant, value, onChange, ...props }: CalendarProps) {
  const cells: (number | null)[] = [null, null, null, ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (<div className={cn(s({ size, variant }), className)} {...props}><p className="bk-cal__title">October 2026</p><div className="bk-cal__grid">{["M","T","W","T","F","S","S"].map((d, i) => <span key={i} className="bk-cal__dow">{d}</span>)}{cells.map((d, i) => d === null ? <span key={"e" + i} /> : <button key={d} type="button" aria-pressed={d === value} className={d === value ? "bk-day is-on" : "bk-day"} onClick={() => onChange(d)}>{d}</button>)}</div></div>);
}
