import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconName } from "./pixel-icon";

const s = cva("bk-wall", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface WallBuilderProps extends React.ComponentProps<"div">, VariantProps<typeof s> { icon?: PixelIconName; rows?: number; cols?: number; }
export function WallBuilder({ className, size, variant, rows = 4, cols = 6, ...props }: WallBuilderProps) {
  const [n, setN] = React.useState(0);
  const total = rows * cols;
  return (<div className={cn(s({ size, variant }), className)} {...props}><div className="bk-wall" role="img" aria-label={n + " of " + total + " bricks laid"}>{Array.from({ length: rows }, (_, r) => (<div key={r} className={r % 2 ? "bk-wall__row is-odd" : "bk-wall__row"}>{Array.from({ length: cols }, (_, c) => <span key={c} className={r * cols + c < n ? "is-on" : ""} />)}</div>))}</div><div className="bk-row"><button type="button" className="bricked-btn bricked-btn--sm" disabled={n >= total} onClick={() => setN(n + 1)}>Lay brick</button><button type="button" className="bricked-btn bricked-btn--sm" onClick={() => setN(0)}>Reset</button><span>{n}/{total}</span></div></div>);
}
