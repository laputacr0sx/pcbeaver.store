import { cn } from "@/lib/utils";
import { type ComponentProps, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import PageButtonSeparator from "./PageButtonSeparator";
export const CURRENT_PAGE_CLASSNAMES =
  "relative z-10 inline-flex items-center rounded-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

export const IDLE_PAGE_CLASSNAMES =
  "relative inline-flex items-center rounded-none border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50";

type PageButtonProps = ComponentProps<"button"> & {
  i: number;
  pageNo: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
};

function PageButton({ i, pageNo, totalPages, setPage }: PageButtonProps) {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Button
      className={cn(
        pageNo != i ? IDLE_PAGE_CLASSNAMES : CURRENT_PAGE_CLASSNAMES,
      )}
      onClick={() => handlePageChange(i)}
    >
      {i + 1}
    </Button>
  );
}

type PaginationButtonProps = {
  pageNo: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
};

function PaginationButtons({
  pageNo,
  totalPages,
  setPage,
}: PaginationButtonProps) {
  const startPage = Math.max(0, pageNo - 2);
  const endPage = Math.min(totalPages - 1, pageNo + 2);
  const pages = [];

  if (startPage >= 2) {
    pages.push(
      <PageButton
        i={0}
        pageNo={pageNo}
        totalPages={totalPages}
        setPage={setPage}
      />,
      <PageButtonSeparator key={"start-separator"} />,
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <PageButton
        i={i}
        pageNo={pageNo}
        totalPages={totalPages}
        setPage={setPage}
      />,
    );
  }

  if (endPage <= totalPages - 3) {
    pages.push(
      <PageButtonSeparator key={"end-separator"} />,
      <PageButton
        i={totalPages - 1}
        pageNo={pageNo}
        totalPages={totalPages}
        setPage={setPage}
      />,
    );
  }

  return pages;
}

export default PaginationButtons;
