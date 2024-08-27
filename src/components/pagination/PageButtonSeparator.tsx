import { type ComponentPropsWithoutRef } from "react";

function PageButtonSeparator(props: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
      {...props}
    >
      ...
    </span>
  );
}

export default PageButtonSeparator;
