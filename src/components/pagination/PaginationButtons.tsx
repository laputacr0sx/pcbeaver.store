import { cn } from "@/lib/utils";
import { type ComponentProps, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { CURRENT_PAGE_CLASSNAMES, IDLE_PAGE_CLASSNAMES } from "./PaginationBar";

function PageSeparator() {
  return (
    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
      ...
    </span>
  );
}

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
      key={i}
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
      <PageSeparator />,
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
      <PageSeparator />,
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
