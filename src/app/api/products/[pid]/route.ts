import { env } from "@/env";
import axios from "axios";
import { type Product } from "../getProducts";

export async function GET({ params }: { params: { pid: string } }) {
  const pid = params.pid;
  console.log(pid);

  const item = await axios.get<Product>(
    `${env.DATABASE_URL}/public/product/${pid}`,
  );

  console.table(item.data);

  return Response.json({ data: item.data });
  // return item.data;
}
