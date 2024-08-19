import axios from "axios";
import { env } from "@/env.js";

export type Product = {
  pid: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
  stock: number;
};

export type GetAllProductsDTO = {
  content: Product[];
};

export async function getProductList() {
  const res = await axios.get<GetAllProductsDTO>(
    `${env.DATABASE_URL}/public/product`,
  );
  return res.data;
}
