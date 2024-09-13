"use client";

import { type ComponentProps } from "react";

export function sliceInfo(
  pageNo: number,
  pageSize: number,
  totalElements: number,
) {
  const beginOfSlice = pageNo * pageSize + 1;
  const endOfSlice =
          beginOfSlice + 20 > totalElements ? totalElements : beginOfSlice + 20;

  return {
    beginOfSlice,
    endOfSlice
  };
}

type ShowElementsDetailsProps = ComponentProps<"div"> & {
  beginOfSlice: number;
  endOfSlice: number;
  totalElements: number;
};

function ShowElementsDetailsLabel({
                                    beginOfSlice,
                                    endOfSlice,
                                    totalElements,
                                  }: ShowElementsDetailsProps) {
  return (
    <div>
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{beginOfSlice}</span> to{" "}
        <span className="font-medium">{endOfSlice}</span> of{" "}
        <span className="font-medium">{totalElements}</span> results
      </p>
    </div>
  );
}

export default ShowElementsDetailsLabel;
