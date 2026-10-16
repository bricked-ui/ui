import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-cut bk-bricks inline-flex items-center gap-2 font-pixel", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface CopyButtonProps extends Omit<React.ComponentProps<"button">, "onCopy">, VariantProps<typeof s> { text: string; icon?: PixelIconInput; }
export function CopyButton({ className, size, variant, text, icon = "plus", ...props }: CopyButtonProps) {
  const [done, setDone] = React.useState(false);
  return (<button type="button" className={cn(s({ size, variant }), className)} onClick={async () => { try { await navigator.clipboard.writeText(text); } catch {} setDone(true); setTimeout(() => setDone(false), 1500); }} {...props}><PixelIcon icon={done ? "check" : icon} />{done ? "Copied" : "Copy"}</button>);
}
