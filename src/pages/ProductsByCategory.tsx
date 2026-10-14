import { getProductsPage } from "@/api/products";
import PageTransition from "@/components/PageTransition";
import Products from "@/components/ui/Products";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import TitleSkeleton from "@/components/ui/TitleSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import flattenProductPages from "@/utils/flattenProductPages";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useI18n } from "@/i18n";
import { FaRegFaceFrown } from "react-icons/fa6";

const PAGE_SIZE = 10;

const ProductsByCategory = () => {
  const { category = "" } = useParams();
  const { t } = useI18n();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["productsByCategory", category],
    queryFn: ({ pageParam }) =>
      getProductsPage({ page: pageParam, limit: PAGE_SIZE, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  });

  const allProducts = flattenProductPages(data?.pages);
  const total = data?.pages[0]?.total ?? allProducts.length;
  const hasLoadedMore = (data?.pages.length ?? 0) > 1;

  // Initial load failed (no data at all)
  if (isError && allProducts.length === 0)
    return (
      <EmptyState
        icon={<FaRegFaceFrown size={50} />}
        title={t("state.errorTitle")}
        desc={t("state.errorDesc")}
        actionLabel={t("state.retry")}
        onAction={() => refetch()}
      />
    );

  if (isLoading)
    return (
      <section className="custom-container section-padding">
        <TitleSkeleton />
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
       gap-6  "
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </section>
    );

  return (
    <PageTransition>
      <Products
        heading={category.replace(/-/g, " ")}
        subHeading={t("categories.products", { n: total })}
        allProducts={allProducts}
        onRetry={() => refetch()}
        loadMore={{
          hasMore: hasNextPage,
          isLoading: isFetchingNextPage,
          isError: isError && allProducts.length > 0,
          onFetch: () => fetchNextPage(),
          showEndMessage: hasLoadedMore,
        }}
      />
    </PageTransition>
  );
};

export default ProductsByCategory;

