"use client";

import ShoppingCart from "@/components/LandingPage/Cart";
import SignInButton from "@/components/LandingPage/SignInButton";
import { navigation } from "@/constants/navigations";
import { fetchBrand, fetchCategory } from "@/lib/fetcher";
import {
  type Brand,
  type Category,
} from "@/type/product/dto/res/GetAllProductsDTO.type";
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
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
export default function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [{ data: brands }, { data: categories }] = useQueries({
    queries: [
      {
        queryKey: ["brands"],
        queryFn: async () => {
          const { data } = await fetchBrand.get<Brand[]>("");
          return data;
        },
      },
      {
        queryKey: ["categories"],
        queryFn: async () => {
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
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  <Tab className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600">
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
                {/* {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-4 px-1 py-2">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <Link
                            href={item.href}
                            className="mt-6 block text-sm font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))} */}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {/* <div className="flow-root"> */}
              {/*   <a */}
              {/*     href="/auth/signup" */}
              {/*     className="-m-2 block p-2 font-medium text-gray-900" */}
              {/*   > */}
              {/*     Create an account */}
              {/*   </a> */}
              {/* </div> */}
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
      {/* This is start of the Desktop Version*/}
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
            <div className="bg-white bg-opacity-10 backdrop-blur-sm backdrop-filter">
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
                          {navigation.categories.map((category) => (
                            <Popover key={category.name} className="flex">
                              <div className="relative flex">
                                <PopoverButton className="group relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                                  {category.name}
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
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative"
                                        >
                                          <Link
                                            href={item.href}
                                            className="mt-1 block font-medium text-gray-900"
                                          >
                                            <span
                                              aria-hidden="true"
                                              className="absolute inset-0 z-10"
                                            />
                                            {item.name}
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </PopoverPanel>
                            </Popover>
                          ))}
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
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                      </button>

                      {/* Search */}
                      <Link href="#" className="ml-2 p-2 text-white">
                        <span className="sr-only">Search</span>
                        <MagnifyingGlassIcon
                          aria-hidden="true"
                          className="h-6 w-6"
                        />
                      </Link>
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
                      <a
                        href="#"
                        className="hidden text-sm font-medium text-white lg:block"
                      >
                        Search
                      </a>

                      <div className="flex items-center lg:ml-8">
                        <SignInButton />
                        <ShoppingCart />
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
