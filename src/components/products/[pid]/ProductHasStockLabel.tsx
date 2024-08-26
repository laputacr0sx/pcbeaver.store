import { CheckIcon } from "@heroicons/react/20/solid";
import { Ban } from "lucide-react";

function ProductHasStockLabel({ stock }: { stock: number }) {
  const hasStock = stock > 0;

  return hasStock ? (
    <div className="mt-6 flex items-center">
      <CheckIcon
        aria-hidden="true"
        className="h-5 w-5 flex-shrink-0 text-green-500"
      />
      <p className="ml-2 text-sm text-green-500/80">
        In stock and ready to ship
      </p>
    </div>
  ) : (
    <div className="mt-6 flex items-center">
      <Ban aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-red-500" />
      <p className="ml-2 text-sm text-red-500/80">Currently Out Of Stock</p>
    </div>
  );
}

export default ProductHasStockLabel;
