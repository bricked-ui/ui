import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const s = cva("bk-cal bk-cut", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface DatePickerProps extends Omit<React.ComponentProps<"div">, "onChange">, VariantProps<typeof s> { value: number; onChange: (d: number) => void; icon?: PixelIconName; }
export function DatePicker({ className, size, variant, value, onChange, icon = "down", ...props }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  return (<div className={cn(s({ size, variant }), className)} {...props}><button type="button" className="bk-input bk-cut" onClick={() => setOpen(!open)} aria-expanded={open}>Day {value} <PixelIcon name={icon} /></button>{open && (<div className="bk-cal__grid">{Array.from({ length: 31 }, (_, i) => i + 1).map(d => <button key={d} type="button" className={d === value ? "bk-day is-on" : "bk-day"} onClick={() => { onChange(d); setOpen(false); }}>{d}</button>)}</div>)}</div>);
}
