"use client";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

function SetProductQuantityButton() {
  return (
    <>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <MinusIcon className="h-5 w-5 flex-shrink-0" />
      </button>
      {20}
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusIcon className="h-5 w-5 flex-shrink-0" />
      </button>
    </>
  );
}

export default SetProductQuantityButton;
