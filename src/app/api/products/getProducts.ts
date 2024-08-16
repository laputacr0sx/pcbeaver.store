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

export type ProductPage = {
  content: Product[];
};
export async function getProductList() {
  const res = await axios.get<ProductPage>(
    `${env.DATABASE_URL}/public/product`,
  );
  return res.data;
}
