import LandingPage from "@/components/landing/LandingPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { getProductList } from "../api/products/getProducts";
import LoadingProdcts from "./loading";

async function ProductListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => getProductList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingProdcts />}>
        <LandingPage />
      </Suspense>
    </HydrationBoundary>
  );
}

export default ProductListPage;
