"use client";

import { Button } from "@/components/tailwindui/button";
import { Input } from "@/components/tailwindui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useGetTransactionByTid from "@/hooks/transaction/useGetTransactionByTid";
import usePayTransaction from "@/hooks/transaction/usePayTransaction";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

export default function CheckoutPage() {
  const { tid } = useParams<{ tid: string }>();
  const { data: transactionData } = useGetTransactionByTid({ tid });

  console.log(transactionData);

  return (
    <>
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section
          aria-labelledby="order-heading"
          className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
        >
          <Disclosure as="div" className="mx-auto max-w-lg">
            <div className="flex items-center justify-between">
              <h2
                id="order-heading"
                className="text-lg font-medium text-gray-900"
              >
                Your Order
              </h2>
              <DisclosureButton className="group font-medium text-indigo-600 hover:text-indigo-500">
                <span className="[.group:not([data-open])_&]:hidden">
                  Hide full summary
                </span>
                <span className="group-data-[open]:hidden">
                  Show full summary
                </span>
              </DisclosureButton>
            </div>

            <DisclosurePanel>
              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-gray-200"
              >
                {transactionData?.items.map((item) => (
                  <li key={item.product.pid} className="flex space-x-6 py-6">
                    <Image
                      width={300}
                      height={300}
                      alt={item.product.name}
                      src={item.product.imageUrl}
                      className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                    />
                    <div className="flex flex-col justify-between space-y-4">
                      <div className="space-y-1 text-sm font-medium">
                        <Link href={`/products/${item.product.pid}`}>
                          <h3 className="text-gray-900">{item.product.name}</h3>
                        </Link>
                        <p className="text-gray-900">{item.product.price}</p>
                        <p className="text-gray-500">x {item.quantity}</p>
                        <p className="text-gray-500">$ {item.subtotal}</p>
                      </div>
                      <div className="flex space-x-4">
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
                  </li>
                ))}
              </ul>
            </DisclosurePanel>

            <p className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
              <span className="text-base">Total</span>
              <span className="text-base">{transactionData?.total}</span>
            </p>
          </Disclosure>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
        >
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul
            role="list"
            className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6"
          >
            {transactionData?.items.map((item) => (
              <li key={item.product.pid} className="flex space-x-6 py-6">
                <Image
                  height={300}
                  width={300}
                  alt={item.product.name}
                  src={item.product.imageUrl}
                  className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                />
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-1 text-sm font-medium">
                    <h3 className="text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-900">{item.product.price}</p>
                    <p className="text-gray-500">x {item.quantity}</p>
                    <p className="text-gray-500">$ {item.subtotal}</p>
                  </div>
                  <div className="flex space-x-4">
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
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base">{transactionData?.total}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
        >
          <div className="mx-auto my-4 max-w-lg">
            {" "}
            <form className="mt-6">
              <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                <div className="col-span-full">
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

                <div className="col-span-full">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      id="name-on-card"
                      name="name-on-card"
                      type="text"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      id="card-number"
                      name="card-number"
                      type="text"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-8 sm:col-span-9">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      id="expiration-date"
                      name="expiration-date"
                      type="text"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      id="cvc"
                      name="cvc"
                      type="text"
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      id="region"
                      name="region"
                      type="text"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      id="postal-code"
                      name="postal-code"
                      type="text"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    defaultChecked
                    id="same-as-shipping"
                    name="same-as-shipping"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <label
                  htmlFor="same-as-shipping"
                  className="text-sm font-medium text-gray-900"
                >
                  Billing address is the same as shipping address
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Pay ${transactionData?.total}
              </button>

              <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
                <LockClosedIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 text-gray-400"
                />
                Payment details stored in plain text
              </p>
            </form>
          </div>
        </section>
        {transactionData && (
          <section>
            <PaymentFormComponent tid={transactionData.tid} />
          </section>
        )}
      </main>
    </>
  );
}

const paymentFormSchema = z.object({
  emailAddress: z.string().email("Invalid email address"),
  nameOnCard: z.string().min(1, "Name on card is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiration date must be in MM/YY format",
    )
    .refine(
      (date) => {
        const [month, year] = date.split("/").map(Number);
        const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
        const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
        // Check if the year is in the future or if the year is the current year and the month is in the future
        return (
          year! > currentYear ||
          (year === currentYear && month! >= currentMonth)
        );
      },
      {
        message: "Expiration date must be in the future",
      },
    ),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

type PaymentForm = z.infer<typeof paymentFormSchema>;

function PaymentFormComponent({ tid }: { tid: number }) {
  const paymentForm = useForm<PaymentForm>({
    resolver: zodResolver(paymentFormSchema),
  });
  const { mutate: payTransaction } = usePayTransaction();

  async function onSubmit(values: PaymentForm) {
    console.table(values);
    payTransaction({ tid });
  }

  function invalidSubmit(err: FieldErrors<PaymentForm>) {
    console.error(err);
    console.error("Invalid form submission");
  }

  return (
    <Form {...paymentForm}>
      <form
        className="mt-6"
        onSubmit={paymentForm.handleSubmit(onSubmit, invalidSubmit)}
      >
        <div className="grid grid-cols-12 gap-x-4 gap-y-6">
          <div className="col-span-full">
            <FormField
              control={paymentForm.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full">
            <FormField
              control={paymentForm.control}
              name="nameOnCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Name On Card
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full">
            <FormField
              control={paymentForm.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Card number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-8 sm:col-span-9">
            <FormField
              control={paymentForm.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Expiration date (MM/YY)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4 sm:col-span-3">
            <FormField
              control={paymentForm.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    CVC
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full">
            <FormField
              control={paymentForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full sm:col-span-4">
            <FormField
              control={paymentForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full sm:col-span-4">
            <FormField
              control={paymentForm.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    State / Province
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full sm:col-span-4">
            <FormField
              control={paymentForm.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* <div className="mt-6 flex space-x-2"> */}
        {/*   <FormField */}
        {/*     control={paymentForm.control} */}
        {/*     name="sameAsShipping" */}
        {/*     render={({ field }) => ( */}
        {/*       <FormItem className="flex h-5 items-center"> */}
        {/*         <FormControl> */}
        {/*           <div className="flex h-5 items-center"> */}
        {/*             <Checkbox */}
        {/*               color="teal" */}
        {/*               {...field} */}
        {/*               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" */}
        {/*               checked={field.value} */}
        {/*               onChange={field.onChange} */}
        {/*             /> */}
        {/*           </div> */}
        {/*         </FormControl> */}
        {/*         <FormLabel> */}
        {/*           Billing address is the same as shipping address */}
        {/*         </FormLabel> */}
        {/*       </FormItem> */}
        {/*     )} */}
        {/*   /> */}
        {/* </div> */}

        <Button
          type="submit"
          className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Pay ${0}
        </Button>

        <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
          <LockClosedIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 text-gray-400"
          />
          Payment details stored in plain text
        </p>
      </form>
    </Form>
  );
}
