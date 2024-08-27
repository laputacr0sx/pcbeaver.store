import LandingPage from "@/components/landing/LandingPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import LoadingProdcts from "./loading";
import { getAllProducts } from "@/hooks/product/useGetAllProducts";

async function ProductListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
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
