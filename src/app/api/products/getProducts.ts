import { fetchProduct } from "@/lib/fetcher";
import {
  type Product,
  type PaginatedResponseDTO,
} from "@/type/product/dto/res/GetAllProductsDTO";

export type BriefProduct = Omit<Product, "stock"> & { hasStock: boolean };

export async function getProductList(page = 0, size = 20) {
  const res = await fetchProduct.get<PaginatedResponseDTO<BriefProduct>>("", {
    params: {
      page,
      size,
    },
  });

  return res.data;
}
