import { env } from "@/env";
import axios from "axios";
import { getAuthConfig } from "./authService";

export const fetchProduct = axios.create({
  baseURL: `${env.NEXT_PUBLIC_DATABASE_URL}/public/product`,
});

export const fetchCategory = axios.create({
  baseURL: `${env.NEXT_PUBLIC_DATABASE_URL}/public/category`,
});

export const fetchBrand = axios.create({
  baseURL: `${env.NEXT_PUBLIC_DATABASE_URL}/public/brand`,
});

export const fetchCart = axios.create({
  baseURL: `${env.NEXT_PUBLIC_DATABASE_URL}/cart`,
});
