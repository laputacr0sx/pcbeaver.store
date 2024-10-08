"use client";

import { Button }                    from "@/components/tailwindui/button";
import { Input }                     from "@/components/tailwindui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
}                                    from "@/components/ui/form";
import useGetTransactionByTid        from "@/hooks/transaction/useGetTransactionByTid";
import usePayTransaction             from "@/hooks/transaction/usePayTransaction";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
}                                    from "@headlessui/react";
import { LockClosedIcon }            from "@heroicons/react/20/solid";
import { zodResolver }               from "@hookform/resolvers/zod";
import Image                         from "next/image";
import Link                          from "next/link";
import { useParams }                 from "next/navigation";
import { type FieldErrors, useForm } from "react-hook-form";
import { z }                         from "zod";
import { PrepareTransactionDTO }     from "@/type/transaction/dto/res/PrepareTransactionDTO.type";
import { Divider }                   from "@/components/tailwindui/divider";
import toast                         from "react-hot-toast";
import useFinishTransaction          from "@/hooks/transaction/useFinishTransaction";

export default function CheckoutPage() {
  const { tid } = useParams<{ tid: string }>();
  const { data: transactionData } = useGetTransactionByTid({ tid });


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

            <p
              className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
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

        {transactionData && (
          <PaymentFormComponent transaction={transactionData}/>
        )}
      </main>
    </>
  );
}

const paymentFormSchema = z.object({
  emailAddress  : z.string({
    required_error: "Email address is required",
  })
    .email("Invalid email address"),
  nameOnCard    : z.string({
    required_error: "Name is required",
  })
    .min(1, "Name on card is required"),
  cardNumber    : z.string({
    required_error: "Card number is required",
  })
    .regex(/^\d{16}$/, "Card number must be 16 digits"),
  expirationDate: z
    .string({
      required_error: "Expiration date is required",
    })
    .regex(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiration date must be in MM/YY format",
    )
    .refine(
      (date) => {
        const [month, year] = date.split("/")
          .map(Number);
        const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
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
  cvc           : z.string({
    required_error: "CVC is required"
  })
    .regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  address       : z.string({
    required_error: "Address is required"
  })
    .min(1, "Address is required"),
  city          : z.string({
    required_error: "City is required"
  })
    .min(1, "City is required"),
  region        : z.string({
    required_error: "State/Province is required"
  }),
  postalCode    : z.string({
    required_error: "Postal code is required"
  })
    .min(1, "Invalid postal code"),
});

type PaymentForm = z.infer<typeof paymentFormSchema>;

function PaymentFormComponent({ transaction }: { transaction: PrepareTransactionDTO }) {
  const paymentForm = useForm<PaymentForm>({
    resolver     : zodResolver(paymentFormSchema),
    defaultValues: {
      emailAddress  : "",
      nameOnCard    : "",
      cardNumber    : "",
      expirationDate: "",
      cvc           : "",
      address       : "",
      city          : "",
      region        : "",
      postalCode    : "",
    }
  });
  const { mutate: payTransaction } = usePayTransaction();


  async function onSubmit(values: PaymentForm) {
    payTransaction({ tid: transaction.tid });
  }

  function invalidSubmit(err: FieldErrors<PaymentForm>) {
    console.error(err);
    console.error("Invalid form submission");
  }

  return (
    <section
      aria-labelledby="payment-heading"
      className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
    >
      <div className="mx-auto my-4 max-w-lg">
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
                      <FormMessage/>
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
                      <FormMessage/>
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
                      <FormMessage/>
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
                      <FormMessage/>
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
                      <FormMessage/>
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
                      <FormMessage/>
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
                      <FormMessage/>
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
                      <FormMessage/>
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
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Pay $ {transaction.total}
            </Button>

            <Divider className="my-2"/>

            <section className="flex justify-between items-center">
              <Button
                color={"yellow"}
                onClick={
                  () => {
                    paymentForm.setValue("cvc", "1111");
                    paymentForm.setValue("emailAddress", "test@test.com");
                    paymentForm.setValue("nameOnCard", "Test User");
                    paymentForm.setValue("cardNumber", "4242424242424242");
                    paymentForm.setValue("expirationDate", "12/34");
                    paymentForm.setValue("address", "123 Main St");
                    paymentForm.setValue("city", "Any Town");
                    paymentForm.setValue("region", "CA");
                    paymentForm.setValue("postalCode", "12345");

                    toast.success("Demo payment filled in successfully!", { position: "bottom-center" });
                  }
                }
                className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Demo Fill In
              </Button>

              <Button
                color="rose"
                className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  paymentForm.reset();

                  toast.success("Form Reset");
                }}>
                Reset
              </Button>
            </section>
          </form>
        </Form>
      </div>
    </section>
  );
}
