import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProductList } from "../api/products/getProducts";
import Products from "./ProductPage";
import LandingPage from "./LandingPage";
import { Suspense } from "react";
import LoadingProdcts from "./loading";

async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingProdcts />}>
        <LandingPage />
      </Suspense>
    </HydrationBoundary>

    // return (
    //   <div className="flex h-screen justify-center">
    //     <div className="w-[80%] selection:bg-[#407AB1] selection:text-[#FFCE00]">
    //       <p>所有產品</p>
    //       <HydrationBoundary state={dehydrate(queryClient)}>
    //         <Products />
    //       </HydrationBoundary>
    //     </div>
    //   </div>
  );
}

export default HomePage;
