import React, { type PropsWithChildren } from "react";

type ProductDetailLayoutProps = PropsWithChildren & {
  params: {
    pid: string;
  };
};

async function ProductDetailLayout({
  children,
  params: { pid },
}: ProductDetailLayoutProps) {
  console.log(pid);

  return <div>{children}</div>;
}

export default ProductDetailLayout;
