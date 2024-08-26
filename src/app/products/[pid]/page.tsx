"use client";

import { getProductByPid } from "@/app/api/products/getProductByPid";
import AddToCartForm from "@/components/products/[pid]/AddToCartForm";
import BreadcrumbsNav from "@/components/products/[pid]/BreadcrumbsNav";
import LoadingProduct from "@/components/products/[pid]/LoadingProduct";
import ProductHasStockLabel from "@/components/products/[pid]/ProductHasStockLabel";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams<{ pid: string }>();

  const {
    data: product,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductByPid(params.pid),
  });

  if (isError) return <div>Error: {error.message}</div>;

  if (!isSuccess) return <LoadingProduct />;

  console.log(product);

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

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                HKD$ {product.price}
              </p>
            </div>
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
