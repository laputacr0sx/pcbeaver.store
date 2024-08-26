import { Skeleton } from "@/components/ui/skeleton";

function LoadingProduct() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <Skeleton className="h-10 w-64" />
          <div className="mt-4">
            <Skeleton className="h-10 w-96" />
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <Skeleton className="h-12 w-16" />
            </div>
            <Skeleton className="h-8 w-32" />
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full" />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Add To Cart
            </h2>
            <Skeleton className="h-8 w-96" />
          </section>
        </div>
      </div>
    </div>
  );
}

export default LoadingProduct;
