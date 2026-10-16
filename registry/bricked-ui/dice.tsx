import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelIcon, type PixelIconInput } from "./pixel-icon";

const PIPS: Record<number, number[]> = { 1: [4], 2: [0,8], 3: [0,4,8], 4: [0,2,6,8], 5: [0,2,4,6,8], 6: [0,2,3,5,6,8] };
const s = cva("bk-die bk-cut", {
  variants: {
    size: { sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]", md: "[--px:6px] [--cut:2px] [--icon:4px] text-[14px]", lg: "[--px:8px] [--cut:3px] [--icon:5px] text-[18px]" },
    variant: { primary: "bg-brick text-ink", dark: "bg-ink text-on-dark" },
  },
  defaultVariants: { size: "md", variant: "primary" },
});
export interface DiceProps extends React.ComponentProps<"div">, VariantProps<typeof s> { icon?: PixelIconInput; }
export function Dice({ className, size, variant, ...props }: DiceProps) {
  const [face, setFace] = React.useState(5);
  const [rolling, setRolling] = React.useState(false);
  const roll = () => { setRolling(true); let k = 0; const t = setInterval(() => { setFace(1 + Math.floor(Math.random() * 6)); if (++k >= 8) { clearInterval(t); setRolling(false); } }, 90); };
  return (<div className="bk-row"><div className={cn(s({ size, variant }), className)} role="img" aria-label={"Die showing " + face} {...props}>{Array.from({ length: 9 }, (_, i) => <span key={i} className={PIPS[face].includes(i) ? "is-on" : ""} />)}</div><button type="button" className="bricked-btn bricked-btn--sm" disabled={rolling} onClick={roll}>Roll</button><span>You got {face}</span></div>);
}
