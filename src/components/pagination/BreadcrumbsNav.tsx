import { type Product } from "@/type/Product.type";
import React from "react";

function BreadcrumbsNav({ product }: Readonly<{ product: Product }>) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <div className="flex items-center text-sm">
            <a
              href={`/brand/${product.brand}`}
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              {product.brand}
            </a>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          </div>
        </li>
        <li>
          <div className="flex items-center text-sm">
            <a
              href={`/category/${product.category}`}
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              {product.category}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
}

export default BreadcrumbsNav;
