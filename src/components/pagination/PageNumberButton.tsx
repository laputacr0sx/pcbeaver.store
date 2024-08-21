import React, { type ComponentProps } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type PaginationNumberButtonProps = ComponentProps<"button"> & {
  isCurrent: boolean;
};

const currentPageClassname =
  "relative z-10 inline-flex items-center rounded-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

const idlePageClassname =
  "relative hidden items-center rounded-none px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex";

function PageNumberButton({
  isCurrent,
  children,
}: PaginationNumberButtonProps) {
  return (
    <Button
      variant={"ghost"}
      // aria-current={isCurrent ? "page" : undefined}
      className={cn(isCurrent ? currentPageClassname : idlePageClassname)}
    >
      {children}
    </Button>
  );
}

export default PageNumberButton;
