import { fetchProduct } from "@/lib/fetcher";
import {
  type Product,
  type Category,
} from "@/type/product/dto/res/GetAllProductsDTO.type";
import { useQuery } from "@tanstack/react-query";

async function getProductsByCategory(category: Category) {
  const { data } = await fetchProduct.get<Product>(`/category/${category}`);

  return data;
}

function useGetProductsByCategory(category: Category) {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => getProductsByCategory(category),
  });
}

export default useGetProductsByCategory;
