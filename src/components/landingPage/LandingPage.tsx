"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductList } from "@/app/api/products/getProducts";
import Image from "next/image";

export default function LandingPage() {
  const { data: productPage } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => getProductList(),
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">All Products</h2>
        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {productPage?.content?.map((product) => (
            <div
              key={product.pid}
              className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
            >
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Image
                  alt={product.name}
                  src={product.imageUrl}
                  // className="h-full w-full object-cover object-center"
                  width={200}
                  height={200}
                />
              </div>
              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/products/${product.pid}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-4 text-base font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
