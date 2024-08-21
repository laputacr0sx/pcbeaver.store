import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { type Product } from "@/type/product/dto/res/GetAllProductsDTO";
import Image from "next/image";
import { type ComponentProps } from "react";

type ProductProps = ComponentProps<typeof Card> & Product;

function ShowStock({
  className,
  hasStock,
}: { hasStock: boolean } & ComponentProps<"div">) {
  return hasStock ? (
    <Label className={cn(className)}>有存貨於 貨倉{hasStock}件存貨</Label>
  ) : (
    <Label className={cn("text-slate-600", className)}>沒有存貨</Label>
  );
}

function PriceTag({ children, className }: ComponentProps<"div">) {
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

function ShowPrice({ price }: { price: number }) {
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

export function ProductItem({ className, ...props }: ProductProps) {
  const { name, brand, category, price, imageUrl, hasStock } = props;

  return (
    <Card
      className={cn(
        className,
        "flex-col items-center justify-center rounded-none shadow-none",
      )}
      {...props}
    >
      <CardHeader className="mt-0 space-y-0 py-0">
        <Image
          src={imageUrl}
          alt={name}
          width={360}
          height={360}
          placeholder="blur"
          blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM00dDwBwAB8QDVOryfOwAAAABJRU5ErkJggg=="
        />
      </CardHeader>
      <CardContent className="my-0 grid gap-2 py-0">
        <CardTitle className="text-sm">{name}</CardTitle>
      </CardContent>
      <CardFooter>
        <ShowPrice price={price} />
      </CardFooter>
    </Card>
  );
}
