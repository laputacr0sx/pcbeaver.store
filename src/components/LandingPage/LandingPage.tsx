"use client";

import { useGetAllProducts } from "@/hooks/product/useGetAllProducts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PaginationBar from "../pagination/PaginationBar";
import { Separator } from "../ui/separator";
import { ShowPrice, ShowStock } from "./ProductItem";

export default function LandingPage() {
  const [page, setPage] = useState<number>(0);

  const {
          data: allProducts,
          isLoading,
          isSuccess
        } = useGetAllProducts(page);

  if (isLoading)
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <h2 className="sr-only">All Products</h2>
          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {new Array(20).map((_, i) => {
              return <div key={i}>hello</div>;
            })}
          </div>
          <Separator className="h-4 w-40"/>
        </div>
      </div>
    );

  if (!isSuccess) return <div>Hello</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">All Products</h2>
        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {allProducts?.content?.map((product) => (
            <div
              key={product.pid}
              className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
            >
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Image
                  alt={product.name}
                  src={product.imageUrl}
                  className="object-contain"
                  width={192}
                  height={192}
                />
              </div>
              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/products/${product.pid}`}>
                    <span aria-hidden="true" className="absolute inset-0"/>
                    {product.name}
                  </Link>
                </h3>
                <ShowPrice price={product.price}/>
                <ShowStock hasStock={product.hasStock}/>
              </div>
            </div>
          ))}
        </div>
        <PaginationBar page={page} setPage={setPage} {...allProducts} />
      </div>
    </div>
  );
}
