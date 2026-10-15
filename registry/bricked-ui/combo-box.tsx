import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const s = cva("bk-menu", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface ComboBoxProps extends Omit<React.ComponentProps<"div">, "onChange">, VariantProps<typeof s> { options: string[]; value: string; onChange: (v: string) => void; icon?: PixelIconName; }
export function ComboBox({ className, size, variant, options, value, onChange, icon = "search", ...props }: ComboBoxProps) {
  const [q, setQ] = React.useState("");
  const list = options.filter(o => o.toLowerCase().includes(q.toLowerCase()));
  return (<div className={cn(s({ size, variant }), className)} {...props}><div className="bk-search"><input className="bk-input bk-cut" value={q} placeholder={value || "Pick one"} onChange={e => setQ(e.target.value)} aria-label="Search options" /><PixelIcon name={icon} /></div><div className="bk-list">{list.map(o => <button key={o} type="button" className="bk-list__btn bk-cut" aria-pressed={o === value} onClick={() => onChange(o)}>{o}</button>)}</div></div>);
}
