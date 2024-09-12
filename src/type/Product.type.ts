import type {
  Brand,
  Category,
} from "@/type/product/dto/res/GetAllProductsDTO.type";

export type Product = {
  brand: Brand;
  category: Category;
  imageUrl: string;
  name: string;
  pid: number;
  price: number;
  stock: number;
};

