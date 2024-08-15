import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Products from "./products/ProductPage";
import { getProducts } from "./api/products/getProducts";

async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className="flex h-screen justify-center">
      <div className="w-[80%]">
        <h1>Welcome to Computer Assemble</h1>
      </div>
    </div>
  );
}

export default HomePage;
