import { fetchProduct } from "@/lib/fetcher";
import { type Product } from "@/type/Product.type";
import { type PaginatedResponseDTO } from "@/type/product/dto/res/GetAllProductsDTO.type";
import { useQuery } from "@tanstack/react-query";

export type BriefProduct = Omit<Product, "stock"> & { hasStock: boolean };

export async function getAllProducts(page = 0, size = 20) {
  const res = await fetchProduct.get<PaginatedResponseDTO<BriefProduct>>("", {
    params: {
      page,
      size,
    },
  });

  return res.data;
}

export function useGetAllProducts(page = 0, size = 20) {
  return useQuery({
    queryKey: ["product-list", `hashed-${page}`],
    queryFn: () => getAllProducts(page, size),
  });
}
