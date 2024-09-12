"use client";

import AddToCartForm from "@/components/products/ui/AddToCartForm";
import BreadcrumbsNav from "@/components/products/ui/BreadcrumbsNav";
import LoadingProduct from "@/components/products/ui/LoadingProduct";
import ProductHasStockLabel from "@/components/products/ui/ProductHasStockLabel";
import { useGetProductByPid } from "@/hooks/product/useGetProductByPid";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { type ComponentProps } from "react";

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
export default function ProductDetailPage() {
  const { pid } = useParams<{ pid: string }>();

  const { data: product, isSuccess, isError, error } = useGetProductByPid(pid);

  if (isError) return <div>Error: {error.message}</div>;

  if (!isSuccess) return <LoadingProduct />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <BreadcrumbsNav product={product} />
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          {/* Product Market Details */}
          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>
            <PriceTag className="font-sans">
              {product.price.toLocaleString()}
            </PriceTag>
            <ProductHasStockLabel stock={product.stock} />
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <Image
              alt={product.name}
              src={product.imageUrl}
              className="h-full w-full object-contain object-center"
              width={480}
              height={480}
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Add To Cart
            </h2>
            <AddToCartForm />
          </section>
        </div>
      </div>
    </div>
  );
}
