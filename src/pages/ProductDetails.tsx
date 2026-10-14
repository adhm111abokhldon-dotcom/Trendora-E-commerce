import PageTransition from "@/components/PageTransition";
import ProductDetailsHero from "@/components/productDetails/ProductDetailsHero";
import ProductReview from "@/components/productDetails/ProductReview";
import StoreFeatures from "@/components/productDetails/StoreFeatures";
import ProductDetailsHeroSkeleton from "@/components/ui/ProductDetailsHeroSkeleton";
import Products from "@/components/ui/Products";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import Title from "@/components/ui/Title";
import TitleSkeleton from "@/components/ui/TitleSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct, getProductsPage } from "@/api/products";
import flattenProductPages from "@/utils/flattenProductPages";
import { useI18n } from "@/i18n";
import { FaRegFaceFrown } from "react-icons/fa6";

const PAGE_SIZE = 10;

const ProductDetails = () => {
  const { id } = useParams();
  const { t } = useI18n();
  const fetchProduct = () => getProduct(id as string);

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  const {
    data: relatedPages,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
    refetch: refetchRelated,
    fetchNextPage: fetchNextRelatedPage,
    hasNextPage: hasMoreRelated,
    isFetchingNextPage: isFetchingMoreRelated,
  } = useInfiniteQuery({
    queryKey: ["relatedProducts", product?.category],
    queryFn: ({ pageParam }) =>
      getProductsPage({
        page: pageParam,
        limit: PAGE_SIZE,
        category: product?.category ?? "",
      }),
    enabled: !!product?.category,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  });

  if (isProductError)
    return (
      <EmptyState
        icon={<FaRegFaceFrown size={50} />}
        title={t("state.notFound")}
        desc={t("state.errorDesc")}
      />
    );

  if (isRelatedLoading || isProductLoading) {
    return (
      <>
        <section className="custom-container section-padding">
          <TitleSkeleton />
          <ProductDetailsHeroSkeleton />
        </section>

        <section className="custom-container section-padding">
          <TitleSkeleton />
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
         gap-6  "
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </section>
      </>
    );
  }
  if (!product)
    return (
      <EmptyState
        icon={<FaRegFaceFrown size={50} />}
        title={t("state.notFound")}
        desc={t("state.errorDesc")}
      />
    );

  const relatedProducts = flattenProductPages(relatedPages?.pages).filter(
    (p) => p._id !== product._id,
  );
  const hasLoadedMoreRelated = (relatedPages?.pages.length ?? 0) > 1;
  return (
    <PageTransition>
      <div className="bg-base-bg dark:bg-dark-surface">
        <section className="custom-container section-padding">
          <Title heading={product.title} subHeading={product.description} />

          <ProductDetailsHero product={product} key={id} />
        </section>

        <Products
          heading={t("details.related")}
          subHeading={t("details.relatedSub")}
          allProducts={relatedProducts}
          onRetry={isRelatedError ? () => refetchRelated() : undefined}
          loadMore={{
            hasMore: hasMoreRelated,
            isLoading: isFetchingMoreRelated,
            isError: isRelatedError && relatedProducts.length > 0,
            onFetch: () => fetchNextRelatedPage(),
            showEndMessage: hasLoadedMoreRelated,
          }}
        />
        <section className="custom-container section-padding">
          <StoreFeatures />
        </section>
        <section className="custom-container section-padding">
          <Title
            heading={t("details.reviewsTitle")}
            subHeading={t("details.reviewsSub")}
          />
          <ProductReview product={product} />
        </section>
      </div>
    </PageTransition>
  );
};

export default ProductDetails;
