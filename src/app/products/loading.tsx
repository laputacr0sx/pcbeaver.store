'use client'

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function LoadingProducts() {
  return (
    <Skeleton className="bg-white">
      <Skeleton className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <Skeleton className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {new Array(20).map((_, i) => (
            <Skeleton
              key={i}
              className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
            >
              <Skeleton className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Skeleton className="h-full w-full object-cover object-center" />
              </Skeleton>
              <Skeleton className="pb-4 pt-10 text-center">
                <Skeleton className="mt-3 flex flex-col items-center" />
                <Skeleton className="mt-4 text-base font-medium text-gray-900" />
              </Skeleton>
            </Skeleton>
          ))}
        </Skeleton>
      </Skeleton>
    </Skeleton>
  );
}

export default LoadingProducts;
