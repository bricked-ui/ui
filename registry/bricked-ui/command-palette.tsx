import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-menu__list bk-cut", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface CommandPaletteProps extends React.ComponentProps<"div">, VariantProps<typeof s> { items: string[]; onPick: (v: string) => void; icon?: PixelIconInput; }
export function CommandPalette({ className, size, variant, items, onPick, icon = "search", ...props }: CommandPaletteProps) {
  const [q, setQ] = React.useState("");
  const list = items.filter(i => i.toLowerCase().includes(q.toLowerCase()));
  return (<div className={cn(s({ size, variant }), className)} role="dialog" aria-label="Command palette" {...props}><div className="bk-search"><input className="bk-input bk-cut" placeholder="Type a command" value={q} onChange={e => setQ(e.target.value)} aria-label="Search commands" /><PixelIcon icon={icon} /></div>{list.map(it => <button key={it} type="button" className="bk-menu__item" onClick={() => onPick(it)}>{it}</button>)}</div>);
}
