"use client";

import { auth } from "@/components/AuthPage/SigninForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePutItemToCart } from "@/hooks/cart/usePutItemToCart";
import { useGetProductByPid } from "@/hooks/product/useGetProductByPid";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const addToCartFormSchema = z.object({
  quantity: z.number(),
});

const validateQuantity = (quantity: number) => {
  return true;
};

function AddtoCartForm() {
  const { pid } = useParams<{ pid: string }>();
  const [user] = useAuthState(auth);

  const addToCartForm = useForm<z.infer<typeof addToCartFormSchema>>({
    resolver: zodResolver(addToCartFormSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const { mutate, isPending } = usePutItemToCart(
    pid,
    addToCartForm.getValues("quantity"),
  );

  const { data: product, isSuccess, isError, error } = useGetProductByPid(pid);

  async function onSubmit(data: z.infer<typeof addToCartFormSchema>) {
    console.log("From obSubmit data", data.quantity);

    event?.preventDefault();
    mutate(undefined, {
      onSuccess: () => toast.success("Successfully added to cart!"),
    });

    addToCartForm.reset();
  }

  return (
    <Form {...addToCartForm}>
      <form
        onSubmit={addToCartForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <section className="item-center flex flex-row gap-4">
          <FormField
            control={addToCartForm.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <button
                    {...field}
                    type="button"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      addToCartForm.setValue("quantity", field.value--);
                    }}
                  >
                    <MinusIcon className="h-5 w-5 flex-shrink-0" />
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addToCartForm.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl tracking-wide">
                  {field.value}
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={addToCartForm.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <button
                    {...field}
                    type="button"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      addToCartForm.setValue("quantity", field.value++);
                    }}
                  >
                    <PlusIcon className="h-5 w-5 flex-shrink-0" />
                  </button>
                </FormControl>
                {/* <FormDescription>Input your login email.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        {!!user ? (
          <Button
            type="submit"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            disabled={isPending}
          >
            Add To Cart
          </Button>
        ) : (
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
              <span className="font-medium leading-none text-white">
                Sign in To Add item to Cart
              </span>
            </span>
          </Link>
        )}
      </form>
    </Form>
  );
}

export default AddtoCartForm;
