"use client";

import { Badge } from "@/components/tailwindui/badge";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useGetCartItems, {
  type GetCartItemDTO,
} from "@/hooks/cart/useGetCartItems";
import { useRemoveCartItem } from "@/hooks/cart/useRemoveCartItem";
import useUpdateCartQuantity from "@/hooks/cart/useUpdateCartQuantity";
import {
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useMemo, type BaseSyntheticEvent } from "react";
import { useFieldArray, useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";
import { usePrepareTransaction } from "@/hooks/transaction/usePrepareTransaction";

const cartFormSchema = z.object({
  items: z
  .object({
    pid: z.number(),
    name: z.string(),
    imageUrl: z.string(),
    price: z.number(),
    cartQuantity: z.coerce.number().gt(0),
    stock: z.number().nonnegative(),
  })
  .array(),
  total: z.number(),
});

type CartFormProps = {
  items: GetCartItemDTO[];
};

function CartForm({ items }: CartFormProps) {
  const SHIPPING = 0;

  const { mutate: removeCartItem, isPending: removingCartItem } =
    useRemoveCartItem();

  const {
    mutate: updateCartQuantity,
    isPending: updatingCartQuantity,
    isSuccess: isCartQuantityUpdated,
    error: updateCartQuantityError,
  } = useUpdateCartQuantity();

  const {
    mutate: prepareTransaction,
    isPending: preparingTransaction,
    isSuccess: transactionIsPrepared, error: prepareTransactionError
  } = usePrepareTransaction();

  const cartForm = useForm<z.infer<typeof cartFormSchema>>({
    resolver: zodResolver(cartFormSchema),
    defaultValues: {
      items: items,
      total: 0,
    },
  });

  const itemsArray = useFieldArray({
    control: cartForm.control,
    name: "items",
  });


  const total = useMemo(
    () =>
      itemsArray.fields.reduce((prev, curr) => {
        return prev + curr.price * curr.cartQuantity;
      }, 0),
    [itemsArray],
  );

  function onValidCartSubmit(
    data: z.infer<typeof cartFormSchema>,
  ) {
    console.table(data);
    prepareTransaction();
  }

  function onInvalidCartSubmit(
    err: FieldErrors<z.infer<typeof cartFormSchema>>,
  ) {
    console.error(err);
  }

  return (
    <Form {...cartForm}>
      <form
        onSubmit={cartForm.handleSubmit(onValidCartSubmit, onInvalidCartSubmit)}
        className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
      >
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>

          <ul
            role="list"
            className="divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {itemsArray.fields.map((item, index) => {
              const subTotal = item.price * item.cartQuantity;

              return (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <Image
                      alt={item.name}
                      src={item.imageUrl}
                      width={192}
                      height={192}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link
                              href={`/products/${item.pid}`}
                              target="_blank"
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          $ {item.price} / 1
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <FormItem>
                          <FormLabel className="sr-only">
                            Quantity , {item.cartQuantity}
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-[5vw] max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                              onBlur={(evt) => {
                                console.log(evt.target.value);
                                updateCartQuantity({
                                  pid: item.pid,
                                  quantity: parseInt(evt.target.value),
                                });

                                if (!updateCartQuantityError) {
                                  itemsArray.update(index, {
                                    ...item,
                                    cartQuantity: parseInt(evt.target.value),
                                  });
                                }
                              }}
                              disabled={updatingCartQuantity}
                              defaultValue={item.cartQuantity}
                            />
                          </FormControl>
                        </FormItem>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => {
                              itemsArray.remove(index);
                              removeCartItem(item.pid);
                            }}
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIconMini
                              aria-hidden="true"
                              className="h-5 w-5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col text-left align-middle">
                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {item ? (
                          <Badge color="green">In Stock</Badge>
                        ) : (
                          <Badge color="zinc">Out Of Stock</Badge>
                        )}
                      </p>
                      <p>
                        <span>$ </span>
                        {subTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2
            id="summary-heading"
            className="text-lg font-medium text-gray-900"
          >
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="font-mono text-sm font-medium text-gray-900">
                $ {total.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">
                    Learn more about how shipping is calculated
                  </span>
                  <QuestionMarkCircleIcon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </a>
              </dt>
              <dd className="font-mono text-sm font-medium text-gray-900">
                $ {SHIPPING.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="font-mono text-base font-medium text-gray-900">
                $ {(total + SHIPPING).toFixed(2)}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>
        </section>
      </form>
    </Form>
  );
}

function ShoppingCartPage() {
  const {
    data: cartItems,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetCartItems();

  if (isLoading) return <div>I am Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!isSuccess) return <div>Loading...</div>;

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        購物車
      </h1>

      {/* <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"> */}
      {/*   <section aria-labelledby="cart-heading" className="lg:col-span-7"> */}
      {/*     <h2 id="cart-heading" className="sr-only"> */}
      {/*       Items in your shopping cart */}
      {/*     </h2> */}
      {/**/}
      {/*     <ul */}
      {/*       role="list" */}
      {/*       className="divide-y divide-gray-200 border-b border-t border-gray-200" */}
      {/*     > */}
      {/*       {cartItems?.map((product, productIdx) => { */}
      {/*         const subTotal = product.price * product.cartQuantity; */}
      {/**/}
      {/*         return ( */}
      {/*           <li key={product.pid} className="flex py-6 sm:py-10"> */}
      {/*             <div className="flex-shrink-0"> */}
      {/*               <Image */}
      {/*                 alt={product.name} */}
      {/*                 src={product.imageUrl} */}
      {/*                 width={192} */}
      {/*                 height={192} */}
      {/*                 className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" */}
      {/*               /> */}
      {/*             </div> */}
      {/**/}
      {/*             <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6"> */}
      {/*               <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"> */}
      {/*                 <div> */}
      {/*                   <div className="flex justify-between"> */}
      {/*                     <h3 className="text-sm"> */}
      {/*                       <Link */}
      {/*                         href={`/products/${product.pid}`} */}
      {/*                         target="_blank" */}
      {/*                         className="font-medium text-gray-700 hover:text-gray-800" */}
      {/*                       > */}
      {/*                         {product.name} */}
      {/*                       </Link> */}
      {/*                     </h3> */}
      {/*                   </div> */}
      {/*                   <p className="mt-1 text-sm font-medium text-gray-900"> */}
      {/*                     $ {product.price} / 1 */}
      {/*                   </p> */}
      {/*                 </div> */}
      {/**/}
      {/*                 <div className="mt-4 sm:mt-0 sm:pr-9"> */}
      {/*                   <label */}
      {/*                     htmlFor={`quantity-${productIdx}`} */}
      {/*                     className="sr-only" */}
      {/*                   > */}
      {/*                     Quantity, {product.cartQuantity} */}
      {/*                   </label> */}
      {/*                   <input */}
      {/*                     id={`quantity-${productIdx}`} */}
      {/*                     name={`quantity-${productIdx}`} */}
      {/*                     onBlur={() => { */}
      {/*                       return; */}
      {/*                     }} */}
      {/*                     disabled={true} */}
      {/*                     defaultValue={product.cartQuantity} */}
      {/*                     className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" */}
      {/*                   /> */}
      {/**/}
      {/*                   <div className="absolute right-0 top-0"> */}
      {/*                     <button */}
      {/*                       type="button" */}
      {/*                       className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500" */}
      {/*                       onClick={() => removeCartItem(product.pid)} */}
      {/*                       disabled={removingCartItem} */}
      {/*                     > */}
      {/*                       <span className="sr-only">Remove</span> */}
      {/*                       <XMarkIconMini */}
      {/*                         aria-hidden="true" */}
      {/*                         className="h-5 w-5" */}
      {/*                       /> */}
      {/*                     </button> */}
      {/*                   </div> */}
      {/*                 </div> */}
      {/*               </div> */}
      {/**/}
      {/*               <div className="flex flex-col text-left align-middle"> */}
      {/*                 <p className="mt-4 flex space-x-2 text-sm text-gray-700"> */}
      {/*                   {product.stock ? ( */}
      {/*                     <Badge color="green">In Stock</Badge> */}
      {/*                   ) : ( */}
      {/*                     <Badge color="zinc">Out Of Stock</Badge> */}
      {/*                   )} */}
      {/*                 </p> */}
      {/*                 <p> */}
      {/*                   <span>$ </span> */}
      {/*                   {subTotal.toLocaleString()} */}
      {/*                 </p> */}
      {/*               </div> */}
      {/*             </div> */}
      {/*           </li> */}
      {/*         ); */}
      {/*       })} */}
      {/*     </ul> */}
      {/*   </section> */}
      {/*   <section */}
      {/*     aria-labelledby="summary-heading" */}
      {/*     className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8" */}
      {/*   > */}
      {/*     <h2 */}
      {/*       id="summary-heading" */}
      {/*       className="text-lg font-medium text-gray-900" */}
      {/*     > */}
      {/*       Order summary */}
      {/*     </h2> */}
      {/**/}
      {/*     <dl className="mt-6 space-y-4"> */}
      {/*       <div className="flex items-center justify-between"> */}
      {/*         <dt className="text-sm text-gray-600">Subtotal</dt> */}
      {/*         <dd className="font-mono text-sm font-medium text-gray-900"> */}
      {/*           $ {total.toFixed(2)} */}
      {/*         </dd> */}
      {/*       </div> */}
      {/*       <div className="flex items-center justify-between border-t border-gray-200 pt-4"> */}
      {/*         <dt className="flex items-center text-sm text-gray-600"> */}
      {/*           <span>Shipping estimate</span> */}
      {/*           <a className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"> */}
      {/*             <span className="sr-only"> */}
      {/*               Learn more about how shipping is calculated */}
      {/*             </span> */}
      {/*             <QuestionMarkCircleIcon */}
      {/*               aria-hidden="true" */}
      {/*               className="h-5 w-5" */}
      {/*             /> */}
      {/*           </a> */}
      {/*         </dt> */}
      {/*         <dd className="font-mono text-sm font-medium text-gray-900"> */}
      {/*           $ {SHIPPING.toFixed(2)} */}
      {/*         </dd> */}
      {/*       </div> */}
      {/*       <div className="flex items-center justify-between border-t border-gray-200 pt-4"> */}
      {/*         <dt className="text-base font-medium text-gray-900"> */}
      {/*           Order total */}
      {/*         </dt> */}
      {/*         <dd className="font-mono text-base font-medium text-gray-900"> */}
      {/*           $ {(total + SHIPPING).toFixed(2)} */}
      {/*         </dd> */}
      {/*       </div> */}
      {/*     </dl> */}
      {/**/}
      {/*     <div className="mt-6"> */}
      {/*       <button */}
      {/*         type="submit" */}
      {/*         className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50" */}
      {/*       > */}
      {/*         Checkout */}
      {/*       </button> */}
      {/*     </div> */}
      {/*   </section> */}
      {/* </form> */}

      <CartForm items={cartItems}/>
    </main>
  );
}

export default ShoppingCartPage;
