"user client";

import useGetCartItems from "@/hooks/cart/useGetCartItems";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

function ShoppingCart() {
  const { data: cartItems, isSuccess, isError } = useGetCartItems();

  if (isError)
    return (
      <div className="ml-4 flow-root lg:ml-6">
        <Link href="/" className="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            aria-hidden="true"
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            0
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </Link>
      </div>
    );

  if (!isSuccess)
    return (
      <div className="ml-4 flow-root lg:ml-6">
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    );

  const totalItems = cartItems.reduce(
    (prev, { cartQuantity }) => prev + cartQuantity,
    0,
  );

  return (
    <div className="ml-4 flow-root lg:ml-6">
      <Link href="/cart" className="group -m-2 flex items-center p-2">
        <ShoppingBagIcon
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {totalItems}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </Link>
    </div>
  );
}

export default ShoppingCart;
