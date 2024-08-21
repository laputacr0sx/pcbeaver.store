"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../api/products/getProducts";
import { ProductItem } from "./ProductItem";
import PaginationBar from "@/components/pagination/PaginationBar";

function ProductListPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductList(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-4 grid-rows-5 bg-muted/40">
        {data?.content?.map((product) => {
          const { pid, name, brand, category, price, hasStock, imageUrl } =
            product;

          return (
            <ProductItem
              key={pid}
              pid={pid}
              brand={brand}
              name={name}
              category={category}
              price={price}
              hasStock={hasStock}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
      <PaginationBar />
    </>
  );
}

export default ProductListPage;
