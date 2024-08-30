import LandingPage from "@/components/LandingPage/LandingPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import LoadingProducts from "./loading";
import { getAllProducts } from "@/hooks/product/useGetAllProducts";

async function ProductListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingProducts />}>
        <LandingPage />
      </Suspense>
    </HydrationBoundary>
  );
}

export default ProductListPage;
