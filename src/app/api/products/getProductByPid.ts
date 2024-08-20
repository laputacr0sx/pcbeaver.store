import { env } from '@/env.js';
import axios from 'axios';
import { cache } from 'react';
import { type Product } from './getProducts';

export const getProductByPid = cache(async (id: string) => {
  const item = await axios.get<Product>(
    `${env.DATABASE_URL}/public/product/${id}`
  );
  return item.data;
});
