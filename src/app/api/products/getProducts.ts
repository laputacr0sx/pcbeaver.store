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
export async function getProducts() {
  const res = await axios.get<Product[]>(`${env.DATABASE_URL}/public/product`);
  return res.data;
}
