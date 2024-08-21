import { fetchProduct } from "@/lib/fetcher";
import { type Product } from "@/type/product/dto/res/GetAllProductsDTO";

export const getProductByPid = async (id: string) => {
  const res = await fetchProduct.get<Product>(`/${id}`, {});
  return res.data;
};
