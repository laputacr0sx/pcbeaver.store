"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import useGetTransactionByTid from "@/hooks/transaction/useGetTransactionByTid";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function CheckoutActionForms() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-0">
        <form className="mt-6">
          <h2 className="text-lg font-medium text-gray-900">
            Contact information
          </h2>

          <div className="mt-6">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="text"
                autoComplete="tel"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-2">
            <div className="flex h-5 items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <label htmlFor="terms" className="text-sm text-gray-500">
              I have read the terms and conditions and agree to the sale of my
              personal information to the highest bidder.
            </label>
          </div>

          <button
            type="submit"
            disabled
            className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          >
            Continue
          </button>
        </form>
      </AccordionItem>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function CheckoutPage() {
  const { tid } = useParams<{ tid: string }>();
  const { data: transactionData } = useGetTransactionByTid({ tid });

  console.log(transactionData);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 xl:px-2 xl:pt-14">
        <h1 className="sr-only">Checkout</h1>

        <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="mx-auto w-full max-w-lg">
            <h2 className="sr-only">Order summary</h2>

            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {transactionData?.items.map((item) => {
                  return (
                    <li
                      key={item.product.pid}
                      className="flex flex-col space-x-6 py-6"
                    >
                      <div>
                        <Image
                          height={192}
                          width={192}
                          alt={item.product.name}
                          src={item.product.imageUrl}
                          className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                        />
                        <div className="flex-auto">
                          <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                            <div className="flex-auto space-y-1 text-sm font-medium">
                              <h3 className="text-gray-900">
                                <Link
                                  target="_blank"
                                  href={`/products/${item.product.pid}`}
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                            </div>
                            <div className="flex flex-none space-x-4">
                              <button
                                type="button"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Edit
                              </button>
                              <div className="flex border-l border-gray-300 pl-4">
                                <button
                                  type="button"
                                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <dl className="mt-4 space-y-1 text-sm font-medium text-gray-500">
                          <div className="flex justify-between">
                            <dt>Price</dt>
                            <dd className="text-gray-900">
                              $ {item.product.price}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt>Quantity</dt>
                            <dd className="text-gray-900">x {item.quantity}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt>Subtotal</dt>
                            <dd className="text-gray-900">$ {item.subtotal}</dd>
                          </div>
                        </dl>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${transactionData?.total}</dd>
              </div>
            </dl>
          </div>

          <div className="mx-auto w-full max-w-lg">
            <CheckoutActionForms />
            <div className="mt-10 divide-y divide-gray-200 border-b border-t border-gray-200">
              <button
                type="button"
                disabled
                className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
              >
                Payment details
              </button>
              <button
                type="button"
                disabled
                className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
              >
                Shipping address
              </button>
              <button
                type="button"
                disabled
                className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
              >
                Billing address
              </button>
              <button
                type="button"
                disabled
                className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
              >
                Review
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
