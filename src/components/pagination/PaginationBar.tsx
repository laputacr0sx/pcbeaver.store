import { getProductList } from "@/app/api/products/getProducts";
import { cn } from "@/lib/utils";
import { type GetAllProductsDTO } from "@/type/product/dto/res/GetAllProductsDTO";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import PageNumberButton from "./PageNumberButton";

type PaginationBarProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function PaginationBar({ page, setPage }: PaginationBarProps) {
  const { data: pageData, isSuccess } = useQuery({
    queryKey: ["products", page],
    queryFn: (): Promise<Omit<GetAllProductsDTO, "content">> =>
      getProductList(page),
  });

  if (!isSuccess) return <p>Loading...</p>;

  const { last, pageNo, pageSize, totalElements, totalPages } = pageData;

  function lastThreePages() {
    const middlePage = totalPages / 2;

    if (pageNo < middlePage) {
      return;
    } else {
      return;
    }
  }

  function sliceInfo() {
    const beginOfSlice = pageNo * pageSize + 1;
    const endOfSlice =
      beginOfSlice + 20 > totalElements ? totalElements : beginOfSlice + 20;

    return { beginOfSlice, endOfSlice };
  }
  const { beginOfSlice, endOfSlice } = sliceInfo();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant={"ghost"}
          onClick={() =>
            setPage((prev) => {
              return prev == 0 ? 0 : prev - 1;
            })
          }
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{beginOfSlice}</span> to{" "}
            <span className="font-medium">{endOfSlice}</span> of{" "}
            <span className="font-medium">{totalElements}</span> results
          </p>
        </div>
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
            {/* 
            Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" 
            */}
            <Button
              variant={"ghost"}
              aria-current="page"
              className="relative z-10 inline-flex items-center rounded-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {pageNo + 1}
            </Button>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <Button
              variant={"ghost"}
              className="relative hidden items-center rounded-none px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              {totalPages - 2}
            </Button>
            <Button
              variant={"ghost"}
              className="relative inline-flex items-center rounded-none px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {totalPages - 1}
            </Button>
            <Button
              variant={"ghost"}
              className="relative inline-flex items-center rounded-none px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                console.log(totalPages);
                setPage(totalPages - 1);
              }}
            >
              {totalPages}
            </Button>
            <PageNumberButton
              onClick={() => {
                console.log(totalPages);
                setPage(totalPages - 1);
              }}
              isCurrent={pageNo === totalPages - 1}
            >
              {totalPages}
            </PageNumberButton>
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
