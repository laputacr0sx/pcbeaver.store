"use client";

import ProductPagination from "@/components/pagination/PaginationBar";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../../app/api/products/getProducts";
import { ProductItem } from "./ProductItem";

function Products() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductList(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
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
  );
}

export default Products;
