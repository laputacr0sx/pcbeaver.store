import { fetchProduct } from "@/lib/fetcher";
import { type GetAllProductsDTO } from "@/type/product/dto/res/GetAllProductsDTO";

export async function getProductList(page = 0, size = 20) {
  const res = await fetchProduct.get<GetAllProductsDTO>("", {
    params: {
      page,
      size,
    },
  });

  return res.data;
}
