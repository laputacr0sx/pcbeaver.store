"use client";
import { useQuery } from "@tanstack/react-query";
import { ProductItem } from "./ProductItem";
import { getProducts } from "../api/products/getProducts";

function Products() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return (
    <div className="grid min-h-screen w-full grid-cols-4 bg-muted/40">
      {products?.map((product) => {
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
    </div>
  );
}

export default Products;
