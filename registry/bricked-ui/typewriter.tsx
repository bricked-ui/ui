import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const s = cva("bk-type", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface TypewriterProps extends Omit<React.ComponentProps<"p">, "children">, VariantProps<typeof s> { text: string; icon?: PixelIconInput; }
export function Typewriter({ className, size, variant, text, ...props }: TypewriterProps) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setN(v => { if (v >= text.length) { clearInterval(t); return v; } return v + 1; }), 60); return () => clearInterval(t); }, [text]);
  return (<p className={cn(s({ size, variant }), className)} aria-label={text} {...props}>{text.slice(0, n)}<span className="bk-caret" aria-hidden="true" /></p>);
}
