import { fetchProduct } from "@/lib/fetcher";
import { type Product } from "@/type/Product.type";
import { useQuery }     from "@tanstack/react-query";

export const getProductByPid = async (id: string) => {
  const res = await fetchProduct.get<Product>(`/${id}`);
  return res.data;
};

export function useGetProductByPid(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn : () => getProductByPid(id),
  });
}
