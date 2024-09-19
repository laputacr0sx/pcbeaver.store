"use client";

import { BookOpenIcon }              from "@heroicons/react/24/outline";
import ShoppingCart                  from "@/components/LandingPage/Cart";
import SignInButton                  from "@/components/LandingPage/SignInButton";
import { fetchBrand, fetchCategory } from "@/lib/fetcher";
import {
  type Brand,
  type Category,
}                                    from "@/type/product/dto/res/GetAllProductsDTO.type";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
}                                    from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
}                                    from "@heroicons/react/24/outline";
import { useQueries }                from "@tanstack/react-query";
import Image                         from "next/image";
import Link                          from "next/link";
import { Fragment, useState }        from "react";
import { useGetTransactionsByBuyer } from "@/hooks/transaction/useGetTransactionsByBuyer";
import { Skeleton }                  from "@/components/ui/skeleton";

export default function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [{ data: brands }, { data: categories }] = useQueries({
    queries: [
      {
        queryKey: ["brands"],
        queryFn : async () => {
          const { data } = await fetchBrand.get<Brand[]>("");
          return data;
        },
      },
      {
        queryKey: ["categories"],
        queryFn : async () => {
          const { data } = await fetchCategory.get<Category[]>("");
          return data;
        },
      },
    ],
  });


  return (
    <>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  <Tab
                    key="Brands"
                    className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                  >
                    <Link href={"/products"}>All</Link>
                  </Tab>
                  <Tab
                    className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600">
                    Categories
                  </Tab>
                  <Tab
                    key="Brands"
                    className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                  >
                    Brands
                  </Tab>
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                <TabPanel key="all" className="space-y-4 px-1 py-2">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div key="all" className="group relative">
                      <Link
                        href={"/products"}
                        className="mt-6 block text-sm font-medium text-gray-900"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 z-10"
                        />
                        All Products
                      </Link>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel key="Categories" className="space-y-4 px-1 py-2">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {categories?.map((cat) => (
                      <div key={cat} className="group relative">
                        <Link
                          href={`/categories/${cat}`}
                          className="mt-6 block text-sm font-medium text-gray-900"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 z-10"
                          />
                          {cat}
                        </Link>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel className="space-y-4 px-1 py-2">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {brands?.map((brand) => (
                      <div key={brand} className="group relative">
                        <Link
                          href={`/brands/${brand}`}
                          className="mt-6 block text-sm font-medium text-gray-900"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 z-10"
                          />
                          {brand}
                        </Link>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  href="/auth/signin"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* ---- */}
      {/* This is the end of the Mobile Menu component. */}
      {/* This is the start of the Desktop Version*/}
      {/* ---- */}

      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            alt="PC Beaver"
            src="/PCBeaver2.png"
            width={1024}
            height={768}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />

        {/* Navigation */}
        <header className="relative z-10">
          <nav aria-label="Top">
            {/* Secondary navigation */}
            <div className="bg-zinc-900 ">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div>
                  <div className="flex h-16 items-center justify-between">
                    {/* Logo (lg+) */}
                    <div className="hidden lg:flex lg:flex-1 lg:items-center">
                      <Link href="/">
                        <span className="sr-only">PC Beaver</span>
                        <Image
                          width={500}
                          height={500}
                          alt=""
                          src="/PC-Beaver.webp"
                          className="h-8 w-auto"
                        />
                      </Link>
                    </div>

                    <div className="hidden h-full lg:flex">
                      {/* Flyout menus */}
                      <PopoverGroup className="inset-x-0 bottom-0 px-4">
                        <div className="flex h-full justify-center space-x-8">
                          <Popover key="all" className="flex">
                            <div className="relative flex">
                              <PopoverButton
                                className="group relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                                <Link href={"/products"}>All Products</Link>
                              </PopoverButton>
                            </div>
                          </Popover>
                          <Popover key="Brands" className="flex">
                            <div className="relative flex">
                              <PopoverButton
                                className="group relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                                Brands
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out group-data-[open]:bg-white"
                                />
                              </PopoverButton>
                            </div>

                            <PopoverPanel
                              transition
                              className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 top-1/2 bg-white shadow"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-1 sm:px-2 lg:px-4">
                                  <div className="grid grid-cols-4 gap-x-2 gap-y-4 py-4">
                                    {brands?.slice(0, 30)
                                      .map((brand) => (
                                        <div
                                          key={brand}
                                          className="group relative"
                                        >
                                          <Link
                                            href={`/brands/${brand}`}
                                            className="mt-1 block font-medium text-gray-900"
                                          >
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0 z-10"
                                          />
                                            {brand}
                                          </Link>
                                        </div>
                                      ))}
                                    <div
                                      key={"extra..."}
                                      className="group relative"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />{" "}
                                      ...
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </Popover>
                          <Popover key="Categories" className="flex">
                            <div className="relative flex">
                              <PopoverButton
                                className="group relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                                Categories
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out group-data-[open]:bg-white"
                                />
                              </PopoverButton>
                            </div>

                            <PopoverPanel
                              transition
                              className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 top-1/2 bg-white shadow"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-1 sm:px-2 lg:px-4">
                                  <div className="grid grid-cols-4 gap-x-2 gap-y-4 py-4">
                                    {categories?.map((category) => (
                                      <div
                                        key={category}
                                        className="group relative"
                                      >
                                        <Link
                                          href={`/categories/${category}`}
                                          className="mt-1 block font-medium text-gray-900"
                                        >
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0 z-10"
                                          />
                                          {category}
                                        </Link>
                                      </div>
                                    ))}
                                    <div
                                      key={"extra..."}
                                      className="group relative"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />{" "}
                                      ...
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </Popover>
                        </div>
                      </PopoverGroup>
                    </div>

                    {/* Mobile menu and search (lg-) */}
                    <div className="flex flex-1 items-center lg:hidden">
                      <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-ml-2 p-2 text-white"
                      >
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                      </button>

                    </div>

                    {/* Logo (lg-) */}
                    <Link href="/" className="lg:hidden">
                      <span className="sr-only">Computer Assembler</span>
                      <Image
                        height={200}
                        width={200}
                        alt=""
                        src="/PC-Beaver.webp"
                        className="h-8 w-auto"
                      />
                    </Link>

                    <div className="flex flex-1 items-center justify-end">

                      <div className="flex gap-8 items-center lg:ml-8">
                        <SignInButton/>
                        <OrderHistory/>
                        <ShoppingCart/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}


function OrderHistory() {
  const {
          data     : transactionHistory,
          isSuccess: successLoadTransactionHistory
        } = useGetTransactionsByBuyer();

  if (!successLoadTransactionHistory) return <Skeleton className="rounded-full h-8 w-8"/>;

  console.log(transactionHistory);


  return <div className="ml-4 flow-root lg:ml-6">
    <Link href="/history" className="group -m-2 flex items-center p-2">
      <BookOpenIcon
        aria-hidden="true"
        className="h-6 w-6 flex-shrink-0 text-lime-400 group-hover:text-lime-500"
      />
      <span className="ml-2 text-sm font-medium text-lime-700 group-hover:text-lime-800">
          {transactionHistory.length}
        </span>
      <span className="sr-only">items in cart, view bag</span>
    </Link>
  </div>;

}