import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProductList } from "../api/products/getProducts";
import Products from "./ProductPage";

async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });

  return (
    <div className="flex h-screen justify-center">
      <div className="w-[80%] selection:bg-[#407AB1] selection:text-[#FFCE00]">
        <p>所有產品</p>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Products />
        </HydrationBoundary>
      </div>
    </div>
  );
}

export default HomePage;
