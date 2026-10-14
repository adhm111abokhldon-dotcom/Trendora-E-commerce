import Products from "@/components/ui/Products";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import TitleSkeleton from "@/components/ui/TitleSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { getProductsPage, type ProductsQuery } from "@/api/products";
import flattenProductPages from "@/utils/flattenProductPages";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useI18n } from "@/i18n";
import { FaRegFaceFrown } from "react-icons/fa6";

const PAGE_SIZE = 10;

// Each curated collection maps to a database-side query, so filtering and
// sorting happen in MongoDB BEFORE pagination — Load More then appends
// the next batch of the same query (never records from a different one).
const collectionQuery = (categoryName: string): ProductsQuery => {
  switch (categoryName.toLowerCase()) {
    case "hot-drops":
      return { minRating: 4.7, sort: "rating:desc" };
    case "trending":
    case "trending-now":
      return { sort: "rating:desc" };
    case "new-arrivals":
      return { sort: "meta.createdAt:desc" };
    default:
      // best-sellers and anything else: previously "top rated" client-side
      return { sort: "rating:desc" };
  }
};

const CustomCategory = () => {
  const { categoryName = "" } = useParams<{ categoryName: string }>();
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
    queryKey: ["customCategory", categoryName],
    queryFn: ({ pageParam }) =>
      getProductsPage({
        page: pageParam,
        limit: PAGE_SIZE,
        ...collectionQuery(categoryName),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  });

  const products = flattenProductPages(data?.pages);
  const hasLoadedMore = (data?.pages.length ?? 0) > 1;
  const title = categoryName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  if (isError && products.length === 0)
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
        <TitleSkeleton showSubHeading={false} />
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

  if (products.length === 0)
    return (
      <EmptyState
        icon={<FaRegFaceFrown size={50} />}
        title={t("state.noProducts")}
        desc={t("state.noProductsDesc")}
      />
    );

  return (
    <Products
      heading={title}
      subHeading=""
      allProducts={products}
      onRetry={() => refetch()}
      loadMore={{
        hasMore: hasNextPage,
        isLoading: isFetchingNextPage,
        isError: isError && products.length > 0,
        onFetch: () => fetchNextPage(),
        showEndMessage: hasLoadedMore,
      }}
    />
  );
};

export default CustomCategory;

