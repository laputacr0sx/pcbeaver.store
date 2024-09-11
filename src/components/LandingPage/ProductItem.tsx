import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

export function ShowStock({
  hasStock,
  ...props
}: { hasStock: boolean } & ComponentProps<"div">) {
  return hasStock ? (
    <Label className={cn(props.className)}>有存貨於 貨倉</Label>
  ) : (
    <Label className={cn("text-slate-600", props.className)}>沒有存貨</Label>
  );
}

export function PriceTag({ children, className }: ComponentProps<"div">) {
  return (
    <div className="flex items-start font-sans">
      <p className={cn("px-2 py-1", className)}>
        <span className="inline-flex w-auto max-w-full text-[2.25rem] font-bold tracking-[-0.0042em] text-[#111]">
          <span className="mr-[0.1rem] mt-[0.15em] inline-flex text-sm">$</span>
          {children}
        </span>
      </p>
    </div>
  );
}

export function ShowPrice({ price }: { price: number }) {
  if (price <= 100) {
    return (
      <PriceTag className="bg-[#fd0] shadow-[3px_3px_#e00751]">
        {price}
      </PriceTag>
    );
  } else {
    return <PriceTag>{price}</PriceTag>;
  }
}
