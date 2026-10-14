import Title from "./Title";
import { ProductCardComponent } from "./ProductCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishList } from "@/context/WishlistProvider";
import { useCart } from "@/context/CartProvider";
import { Product } from "@/types/ecommerce";
import { useI18n } from "@/i18n";
import EmptyState from "./EmptyState";
import LoadMoreButton from "./LoadMoreButton";
import { FaRegFaceFrown } from "react-icons/fa6";

type ProductsProps = {
  allProducts: Product[];
  heading: string;
  subHeading?: string;
  onRetry?: () => void;
  loadMore?: {
    hasMore: boolean;
    isLoading: boolean;
    isError: boolean;
    onFetch: () => void;
    showEndMessage?: boolean;
  };
};

const Products = ({
  allProducts,
  heading,
  subHeading,
  onRetry,
  loadMore,
}: ProductsProps) => {
  const { handleToggleWishlist, isInWishList } = useWishList();
  const { isInStock, isInCart, handleAddToCart } = useCart();
  const { t } = useI18n();

  if (allProducts.length === 0)
    return (
      <EmptyState
        icon={<FaRegFaceFrown size={50} />}
        title={t("state.noProducts")}
        desc={t("state.noProductsDesc")}
        actionLabel={onRetry ? t("state.retry") : undefined}
        onAction={onRetry}
      />
    );

  return (
    <section className="custom-container section-padding bg-base-bg dark:bg-dark-surface">
      <Title heading={heading} subHeading={subHeading} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((item) => (
          <ProductCardComponent key={item._id}>
            <ProductCardComponent.Image
              path={`/products/${item._id}`}
              src={item.images?.[0]}
              alt={item.title}
              discount={item.discountPercentage}
              className="w-full h-35 md:h-40"
            >
              <button
                type="button"
                className={`${isInWishList(item._id) ? "text-danger" : ""} absolute bg-base-bg top-1
                end-2 sm:end-3 p-2  backdrop-blur-sm rounded-full
              hover:scale-110 transition z-10 shadow-sm`}
                onClick={() => handleToggleWishlist(item)}
                aria-label={
                  isInWishList(item._id)
                    ? t("wishlist.remove")
                    : t("wishlist.add")
                }
                aria-pressed={isInWishList(item._id)}
              >
                {isInWishList(item._id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </ProductCardComponent.Image>
            <ProductCardComponent.Body
              brand={item.brand || "Generic"}
              price={item.price}
              title={item.title}
            >
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                disabled={!isInStock(item) || isInCart(item)}
                className={`${
                  !isInStock(item) || isInCart(item)
                    ? "bg-gray-400 cursor-not-allowed!"
                    : isInCart(item)
                      ? "bg-success cursor-not-allowed!"
                      : "bg-accent-trendora active:scale-[0.95] cursor-pointer hover:bg-accent-hover shadow-md"
                } text-white text-xs md:text-sm max-sm:self-stretch max-sm:mx-3  max-sm:mb-1 px-3 py-2 rounded-xl transition`}
              >
                {!isInStock(item)
                  ? t("product.outOfStock")
                  : isInCart(item)
                    ? t("product.added")
                    : t("product.add")}
              </button>
            </ProductCardComponent.Body>
          </ProductCardComponent>
        ))}
      </div>
      {loadMore && (
        <LoadMoreButton
          hasMore={loadMore.hasMore}
          isLoading={loadMore.isLoading}
          isError={loadMore.isError}
          onFetch={loadMore.onFetch}
          showEndMessage={loadMore.showEndMessage ?? true}
        />
      )}
    </section>
  );
};

export default Products;

