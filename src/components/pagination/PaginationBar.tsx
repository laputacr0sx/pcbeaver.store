import { getProductList } from "@/app/api/products/getProducts";
import { cn } from "@/lib/utils";
import {
  type PaginatedResponseDTO,
  type Product,
} from "@/type/product/dto/res/GetAllProductsDTO";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { type ClassValue } from "clsx";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import PaginationButtons from "./PaginationButtons";
import ShowElementsDetailsLabel, {
  sliceInfo,
} from "./ShowElementsDetailsLabel";

type PaginationBarProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function PaginationBar({ page, setPage }: PaginationBarProps) {
  const { data: pageData, isSuccess } = useQuery({
    queryKey: ["products", page],
    queryFn: (): Promise<Omit<PaginatedResponseDTO<Product>, "content">> =>
      getProductList(page),
  });

  if (!isSuccess) return <p>Loading...</p>;

  const { last, pageNo, pageSize, totalElements, totalPages } = pageData;

  const { beginOfSlice, endOfSlice } = sliceInfo(
    pageNo,
    pageSize,
    totalElements,
  );

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
