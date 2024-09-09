"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import PaginationButtons from "./PaginationButtons";
import ShowElementsDetailsLabel, {
  sliceInfo,
} from "./ShowElementsDetailsLabel";

type PaginationBarProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  last: boolean;
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export default function PaginationBar({
  page,
  setPage,
  last,
  pageNo,
  pageSize,
  totalElements,
  totalPages,
}: PaginationBarProps) {
  const { beginOfSlice, endOfSlice } = sliceInfo(
    pageNo,
    pageSize,
    totalElements,
  );

  console.table({
    page,
    setPage,
    last,
    pageNo,
    pageSize,
    totalElements,
    totalPages,
    beginOfSlice,
    endOfSlice,
  });
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant={"ghost"}
          onClick={() =>
            setPage((prev) => {
              return prev >= 0 ? 0 : prev - 1;
            })
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={() => setPage((prev) => (last ? prev : prev + 1))}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <ShowElementsDetailsLabel
          beginOfSlice={beginOfSlice}
          endOfSlice={endOfSlice}
          totalElements={totalElements}
        />

        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <Button
              key={"Prev-Button"}
              variant={"ghost"}
              disabled={pageNo == 0}
              onClick={() =>
                setPage((prev) => {
                  return prev == 0 ? 0 : prev - 1;
                })
              }
              className="relative inline-flex items-center rounded-none rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </Button>
            <PaginationButtons
              pageNo={pageNo}
              totalPages={totalPages}
              setPage={setPage}
            />
            <Button
              key={"Next-Button"}
              variant="ghost"
              onClick={() => setPage((prev) => (last ? prev : prev + 1))}
              className={cn(
                "relative inline-flex items-center rounded-none rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
              )}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
