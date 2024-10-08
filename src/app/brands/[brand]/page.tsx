"use client";

import LoadingProducts          from "@/app/products/loading";
import { ShowPrice, ShowStock } from "@/components/LandingPage/ProductItem";
import PaginationBar            from "@/components/pagination/PaginationBar";
import { Separator }            from "@/components/ui/separator";
import type { Brand }           from "@/type/product/dto/res/GetAllProductsDTO.type";

import Image                  from "next/image";
import Link                   from "next/link";
import { useParams }          from "next/navigation";
import { Suspense, useState } from "react";
import useGetProductsByBrand  from "@/hooks/product/useGetProductsByBrand";

function BrandProducts() {
  return (
    <Suspense fallback={<LoadingProducts/>}>
      <BrandProductsPage/>
    </Suspense>
  );
}

function BrandProductsPage() {
  const { brand } = useParams<{ brand: Brand }>();

  const [page, setPage] = useState<number>(0);

  const {
          data: allProducts,
          isLoading,
          isSuccess,
        } = useGetProductsByBrand(brand, page);

  if (isLoading)
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <h2 className="sr-only">Products of {brand}</h2>
          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {new Array(20).map((_, i) => {
              return <div key={i}>hello</div>;
            })}
          </div>
          <Separator className="h-4 w-40"/>
        </div>
      </div>
    );

  if (!isSuccess) {
    return <div>No Content</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products of {brand}</h2>
        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {allProducts.content?.map((product) => (
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

export default BrandProducts;
