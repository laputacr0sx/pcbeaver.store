"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../api/products/getProducts";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LandingPage() {
  const { data: productPage } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductList(),
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {productPage?.content?.map((product) => (
            <div
              key={product.pid}
              className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
            >
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  alt={product.name}
                  src={product.imageUrl}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={"#"}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <p className="sr-only">{4} out of 5 stars</p>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          4 > rating ? "text-yellow-400" : "text-gray-200",
                          "h-5 w-5 flex-shrink-0",
                        )}
                      />
                    ))}
                  </div>
                </div>
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
