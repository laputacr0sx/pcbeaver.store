import { fetchCategory } from "@/lib/fetcher";
import {
  type Category,
  type PaginatedResponseDTO,
} from "@/type/product/dto/res/GetAllProductsDTO.type";
import { useQuery } from "@tanstack/react-query";
import { type BriefProduct } from "./useGetAllProducts";

export async function getProductsByCategory(
  category: Category,
  page: number,
  size: number,
) {
  const { data } = await fetchCategory.get<PaginatedResponseDTO<BriefProduct>>(
    `/${category}`,
    {
      params: {
        page,
        size,
      },
    },
  );

  return data;
}

function useGetProductsByCategory(category: Category, page = 0, size = 20) {
  return useQuery({
    queryKey: ["product", category, page],
    queryFn: () => getProductsByCategory(category, page, size),
  });
}

export default useGetProductsByCategory;
