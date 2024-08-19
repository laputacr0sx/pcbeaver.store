"use client";

import ProductPagination from "@/components/pagination/ProductPagination";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../api/products/getProducts";
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
        const { pid, name, brand, category, price, stock, imageUrl } = product;

        return (
          <ProductItem
            key={pid}
            pid={pid}
            brand={brand}
            name={name}
            category={category}
            price={price}
            stock={stock}
            imageUrl={imageUrl}
          />
        );
      })}
      <ProductPagination />
    </div>
  );
}

export default Products;
