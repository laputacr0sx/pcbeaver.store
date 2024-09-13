import { fetchBrand }        from "@/lib/fetcher";
import {
  type Brand,
  type PaginatedResponseDTO,
}                            from "@/type/product/dto/res/GetAllProductsDTO.type";
import { useQuery }          from "@tanstack/react-query";
import { type BriefProduct } from "./useGetAllProducts";

export async function getProductsByBrand(
  brand: Brand,
  page: number,
  size: number,
) {
  const { data } = await fetchBrand.get<PaginatedResponseDTO<BriefProduct>>(
    `/${brand}`,
    {
      params: {
        page,
        size,
      },
    },
  );

  return data;
}

function useGetProductsByBrand(brand: Brand, page = 0, size = 20) {
  return useQuery({
    queryKey: ["product", brand, page],
    queryFn : () => getProductsByBrand(brand, page, size),
  });
}

export default useGetProductsByBrand;
