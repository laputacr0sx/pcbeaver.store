"use client";

import { getProductByPid } from "@/app/api/products/getProductByPid";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import BreadcrumbsNav from "./BreadcrumbsNav";
import Image from "next/image";

// const product = {
//   name: "Everyday Ruck Snack",
//   href: "#",
//   price: "$220",
//   description:
//     "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
//   imageSrc:
//     "https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg",
//   imageAlt:
//     "Model wearing light green backpack with black canvas straps and front zipper pouch.",
//   breadcrumbs: [
//     { id: 1, name: "Travel", href: "#" },
//     { id: 2, name: "Bags", href: "#" },
//   ],
//   sizes: [
//     { name: "18L", description: "Perfect for a reasonable amount of snacks." },
//     { name: "20L", description: "Enough room for a serious amount of snacks." },
//   ],
// };

export default function ProductDetailPage() {
  const params = useParams<{ pid: string }>();

  const {
    data: myProduct,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductByPid(params.pid),
  });

  if (isLoading || !myProduct) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <BreadcrumbsNav product={myProduct} />
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {myProduct.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {myProduct.price}
              </p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-green-500"
              />
              <p className="ml-2 text-sm text-gray-500">
                In stock and ready to ship
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <Image
              alt={myProduct.name}
              src={myProduct.imageUrl}
              className="h-full w-full object-cover object-center"
              width={640}
              height={640}
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <form>
              {/* <div className="sm:flex sm:justify-between"> */}
              {/* Size selector */}
              {/*   <fieldset> */}
              {/*     <legend className="block text-sm font-medium text-gray-700"> */}
              {/*       Size */}
              {/*     </legend> */}
              {/*     <RadioGroup className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2"> */}
              {/*       {product.sizes.map((size) => ( */}
              {/*         <Radio */}
              {/*           key={size.name} */}
              {/*           as="div" */}
              {/*           value={size} */}
              {/*           aria-label={size.name} */}
              {/*           aria-description={size.description} */}
              {/*           className="group relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500" */}
              {/*         > */}
              {/*           <p className="text-base font-medium text-gray-900"> */}
              {/*             {size.name} */}
              {/*           </p> */}
              {/*           <p className="mt-1 text-sm text-gray-500"> */}
              {/*             {size.description} */}
              {/*           </p> */}
              {/*           <div */}
              {/*             aria-hidden="true" */}
              {/*             className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500" */}
              {/*           /> */}
              {/*         </Radio> */}
              {/*       ))} */}
              {/*     </RadioGroup> */}
              {/*   </fieldset> */}
              {/* </div> */}
              {/* <div className="mt-4"> */}
              {/*   <a */}
              {/*     href="#" */}
              {/*     className="group inline-flex text-sm text-gray-500 hover:text-gray-700" */}
              {/*   > */}
              {/*     <span>What size should I buy?</span> */}
              {/*     <QuestionMarkCircleIcon */}
              {/*       aria-hidden="true" */}
              {/*       className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" */}
              {/*     /> */}
              {/*   </a> */}
              {/* </div> */}
              <div className="mt-10">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Add to bag
                </button>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    aria-hidden="true"
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                  <span className="text-gray-500 hover:text-gray-700">
                    Lifetime Guarantee
                  </span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
