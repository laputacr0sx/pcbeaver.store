import { type  Product } from "@/type/Product.type";

export type PrepareTransactionDTO = {
  tid: number;
  buyerId: number;
  dateTime: Date;
  status: "PREPARE" | "PROCESSING" | "SUCCESS" | "FAIL"
  total: number;
  items: ProductItem[];
}

export type ProductItem = {
  tpid: number;
  product: Product;
  quantity: number;
  subtotal: number;
}

