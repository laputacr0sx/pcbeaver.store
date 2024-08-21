import { ShoppingBagIcon } from "lucide-react";
import React from "react";

function ShoppingCart() {
  return (
    <div className="ml-4 flow-root lg:ml-6">
      <a href="#" className="group -m-2 flex items-center p-2">
        <ShoppingBagIcon
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </a>
    </div>
  );
}

export default ShoppingCart;
