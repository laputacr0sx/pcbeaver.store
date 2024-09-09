"use client";

import ShoppingCart from "@/components/LandingPage/Cart";
import SignInButton from "@/components/LandingPage/SignInButton";
import { navigation } from "@/constants/navigations";
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
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

const categories = [
  {
    name: "CPUs",
    href: "/CPU",
    imageSrc: "/category/CPU.webp",
  },
  {
    name: "GPUs",
    href: "/GPU",
    imageSrc: "/category/GPU.webp",
  },
  {
    name: "Motherboards",
    href: "/Motherboard",
    imageSrc: "/category/Motherboard.jpg",
  },
  {
    name: "RAMs",
    href: "/RAM",
    imageSrc: "/category/RAM.jpg",
  },
  {
    name: "PSU",
    href: "/PSU",
    imageSrc: "/category/PSU.webp",
  },
];

const footerNavigation = {
  shop: [
    { name: "Category", href: "/category/" },
    { name: "Brand", href: "/category/brand/" },
  ],
  company: [{ name: "Who am I", href: "#" }],
  account: [{ name: "Manage Account", href: "#" }],
  connect: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/vvfelix" },
    { name: "Github", href: "https://www.github.com/laputacr0sx" },
  ],
};

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* {/* Mobile menu */}
      {/* <Dialog */}
      {/*   open={mobileMenuOpen} */}
      {/*   onClose={setMobileMenuOpen} */}
      {/*   className="relative z-40 lg:hidden" */}
      {/* > */}
      {/*   <DialogBackdrop */}
      {/*     transition */}
      {/*     className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" */}
      {/*   /> */}
      {/**/}
      {/*   <div className="fixed inset-0 z-40 flex"> */}
      {/*     <DialogPanel */}
      {/*       transition */}
      {/*       className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full" */}
      {/*     > */}
      {/*       <div className="flex px-4 pb-2 pt-5"> */}
      {/*         <button */}
      {/*           type="button" */}
      {/*           onClick={() => setMobileMenuOpen(false)} */}
      {/*           className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" */}
      {/*         > */}
      {/*           <span className="sr-only">Close menu</span> */}
      {/*           <XMarkIcon aria-hidden="true" className="h-6 w-6" /> */}
      {/*         </button> */}
      {/*       </div> */}
      {/**/}
      {/*       {/* Links */}
      {/*       <TabGroup className="mt-2"> */}
      {/*         <div className="border-b border-gray-200"> */}
      {/*           <TabList className="-mb-px flex space-x-8 px-4"> */}
      {/*             {navigation.categories.map((category) => ( */}
      {/*               <Tab */}
      {/*                 key={category.name} */}
      {/*                 className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600" */}
      {/*               > */}
      {/*                 {category.name} */}
      {/*               </Tab> */}
      {/*             ))} */}
      {/*           </TabList> */}
      {/*         </div> */}
      {/*         <TabPanels as={Fragment}> */}
      {/*           {navigation.categories.map((category) => ( */}
      {/*             <TabPanel key={category.name} className="space-y-4 px-1 py-2"> */}
      {/*               <div className="grid grid-cols-2 gap-x-4 gap-y-2"> */}
      {/*                 {category.featured.map((item) => ( */}
      {/*                   <div key={item.name} className="group relative"> */}
      {/*                     <Link */}
      {/*                       href={item.href} */}
      {/*                       className="mt-6 block text-sm font-medium text-gray-900" */}
      {/*                     > */}
      {/*                       <span */}
      {/*                         aria-hidden="true" */}
      {/*                         className="absolute inset-0 z-10" */}
      {/*                       /> */}
      {/*                       {item.name} */}
      {/*                     </Link> */}
      {/*                   </div> */}
      {/*                 ))} */}
      {/*               </div> */}
      {/*             </TabPanel> */}
      {/*           ))} */}
      {/*         </TabPanels> */}
      {/*       </TabGroup> */}
      {/**/}
      {/*       <div className="space-y-6 border-t border-gray-200 px-4 py-6"> */}
      {/*         <div className="flow-root"> */}
      {/*           <a */}
      {/*             href="/auth/signup" */}
      {/*             className="-m-2 block p-2 font-medium text-gray-900" */}
      {/*           > */}
      {/*             Create an account */}
      {/*           </a> */}
      {/*         </div> */}
      {/*         <div className="flow-root"> */}
      {/*           <a */}
      {/*             href="/auth/signin" */}
      {/*             className="-m-2 block p-2 font-medium text-gray-900" */}
      {/*           > */}
      {/*             Sign in */}
      {/*           </a> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*     </DialogPanel> */}
      {/*   </div> */}
      {/* </Dialog> */}
      {/**/}
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

        {/* Desktop Navigation */}

        {/* Navigation */}
        {/* <header className="relative z-10"> */}
        {/*   <nav aria-label="Top"> */}
        {/*     {/* Secondary navigation */}
        {/*     <div className="bg-white bg-opacity-10 backdrop-blur-sm backdrop-filter"> */}
        {/*       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
        {/*         <div> */}
        {/*           <div className="flex h-16 items-center justify-between"> */}
        {/*             {/* Logo (lg+) */}
        {/*             <div className="hidden lg:flex lg:flex-1 lg:items-center"> */}
        {/*               <Link href="/"> */}
        {/*                 <span className="sr-only">PC Beaver</span> */}
        {/*                 <Image */}
        {/*                   width={500} */}
        {/*                   height={500} */}
        {/*                   alt="" */}
        {/*                   src="/PC-Beaver.webp" */}
        {/*                   className="h-8 w-auto" */}
        {/*                 /> */}
        {/*               </Link> */}
        {/*             </div> */}
        {/**/}
        {/*             <div className="hidden h-full lg:flex"> */}
        {/*               {/* Flyout menus */}
        {/*               <PopoverGroup className="inset-x-0 bottom-0 px-4"> */}
        {/*                 <div className="flex h-full justify-center space-x-8"> */}
        {/*                   {navigation.categories.map((category) => ( */}
        {/*                     <Popover key={category.name} className="flex"> */}
        {/*                       <div className="relative flex"> */}
        {/*                         <PopoverButton className="group relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out"> */}
        {/*                           {category.name} */}
        {/*                           <span */}
        {/*                             aria-hidden="true" */}
        {/*                             className="absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out group-data-[open]:bg-white" */}
        {/*                           /> */}
        {/*                         </PopoverButton> */}
        {/*                       </div> */}
        {/**/}
        {/*                       <PopoverPanel */}
        {/*                         transition */}
        {/*                         className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in" */}
        {/*                       > */}
        {/*                         {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
        {/*                         <div */}
        {/*                           aria-hidden="true" */}
        {/*                           className="absolute inset-0 top-1/2 bg-white shadow" */}
        {/*                         /> */}
        {/**/}
        {/*                         <div className="relative bg-white"> */}
        {/*                           <div className="mx-auto max-w-7xl px-1 sm:px-2 lg:px-4"> */}
        {/*                             <div className="grid grid-cols-4 gap-x-2 gap-y-4 py-4"> */}
        {/*                               {category.featured.map((item) => ( */}
        {/*                                 <div */}
        {/*                                   key={item.name} */}
        {/*                                   className="group relative" */}
        {/*                                 > */}
        {/*                                   <Link */}
        {/*                                     href={item.href} */}
        {/*                                     className="mt-1 block font-medium text-gray-900" */}
        {/*                                   > */}
        {/*                                     <span */}
        {/*                                       aria-hidden="true" */}
        {/*                                       className="absolute inset-0 z-10" */}
        {/*                                     /> */}
        {/*                                     {item.name} */}
        {/*                                   </Link> */}
        {/*                                 </div> */}
        {/*                               ))} */}
        {/*                             </div> */}
        {/*                           </div> */}
        {/*                         </div> */}
        {/*                       </PopoverPanel> */}
        {/*                     </Popover> */}
        {/*                   ))} */}
        {/*                 </div> */}
        {/*               </PopoverGroup> */}
        {/*             </div> */}
        {/**/}
        {/*             {/* Mobile menu and search (lg-) */}
        {/*             <div className="flex flex-1 items-center lg:hidden"> */}
        {/*               <button */}
        {/*                 type="button" */}
        {/*                 onClick={() => setMobileMenuOpen(true)} */}
        {/*                 className="-ml-2 p-2 text-white" */}
        {/*               > */}
        {/*                 <span className="sr-only">Open menu</span> */}
        {/*                 <Bars3Icon aria-hidden="true" className="h-6 w-6" /> */}
        {/*               </button> */}
        {/**/}
        {/*               {/* Search */}
        {/*               <a href="#" className="ml-2 p-2 text-white"> */}
        {/*                 <span className="sr-only">Search</span> */}
        {/*                 <MagnifyingGlassIcon */}
        {/*                   aria-hidden="true" */}
        {/*                   className="h-6 w-6" */}
        {/*                 /> */}
        {/*               </a> */}
        {/*             </div> */}
        {/**/}
        {/*             {/* Logo (lg-) */}
        {/*             <Link href="#" className="lg:hidden"> */}
        {/*               <span className="sr-only">Computer Assembler</span> */}
        {/*               <Image */}
        {/*                 height={200} */}
        {/*                 width={200} */}
        {/*                 alt="" */}
        {/*                 src="/PC-Beaver.webp" */}
        {/*                 className="h-8 w-auto" */}
        {/*               /> */}
        {/*             </Link> */}
        {/**/}
        {/*             <div className="flex flex-1 items-center justify-end"> */}
        {/*               <a */}
        {/*                 href="#" */}
        {/*                 className="hidden text-sm font-medium text-white lg:block" */}
        {/*               > */}
        {/*                 Search */}
        {/*               </a> */}
        {/**/}
        {/*               <div className="flex items-center lg:ml-8"> */}
        {/*                 <SignInButton /> */}
        {/*                 <ShoppingCart /> */}
        {/*               </div> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   </nav> */}
        {/* </header> */}

        {/* ---- */}
        {/* This the main page */}
        {/* ---- */}

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Build Your Dream PC from Scratch
          </h1>
          <p className="mt-4 text-xl text-white">
            Explore a vast selection of high-quality components tailored for
            every need. Whether you&apos;re a gamer, a designer, or a creator,
            craft a desktop that perfectly matches your style and performance
            demands. Start building your custom PC today and experience the
            difference.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Show Me
          </Link>
        </div>
      </div>

      <main>
        {/* ---- */}
        {/* Category section */}
        {/* ---- */}

        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
        >
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Shop by Category
            </h2>
            <Link
              href="#"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <Image
                          width={300}
                          height={500}
                          alt={category.name}
                          src={category.imageSrc}
                          className="h-full w-full object-cover object-center"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <Link
              href="#"
              className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </section>

        {/* ---- */}
        {/* Featured section */}
        {/* ---- */}
        <section
          aria-labelledby="comfort-heading"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <Image
                width={1024}
                height={720}
                alt="Assemling a PC"
                src="/Beaver_Assembler.webp"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2
                  id="comfort-heading"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  Simple productivity
                </h2>
                <p className="mt-3 text-xl text-white">
                  Endless tasks, limited hours, a single piece of paper. Not
                  really a haiku, but we&apos;re doing our best here. No kanban
                  boards, burndown charts, or tangled flowcharts with our Focus
                  system. Just the undeniable urge to fill empty circles.
                </p>
                <a
                  href="#"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  Shop Focus
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
