import { useParams } from "react-router-dom";
import { useWishList } from "../../context/WishlistProvider";
import { useCart } from "../../context/CartProvider";
import Title from "../components/ui/Title";
import Products from "../components/ui/Products";
import StoreFeatures from "../components/productDetails/StoreFeatures";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsHero from "../components/productDetails/ProductDetailsHero";
import ProductReview from "../components/productDetails/ProductReview";
import TitleSkeleton from "../components/ui/TitleSkeleton";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import ProductDetailsHeroSkeleton from "../components/ui/ProductDetailsHeroSkeleton";
import PageTransition from "../components/PageTransition";

const ProductDetails = () => {
  const { id } = useParams();
  const { wishListState, wishListDispatch, isInWishList } = useWishList();
  const { cartDispatch } = useCart();

  const fetchProduct = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch Product");
    return res.json();
  };

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products/category/${product?.category}`,
    );
    if (!res.ok) throw new Error("Failed to fetch Products");
    const data = await res.json();
    return data.products;
  };

  const {
    data: relatedProducts = [],
    isLoading: isRelatedLoading,
    error: relatedError,
  } = useQuery({
    queryKey: ["products", product?.category],
    queryFn: fetchProducts,
    enabled: !!product?.category,
  });
  if (productError) return <p>{productError.message}</p>;
  if (relatedError) return <p>{relatedError.message}</p>;

  if (isRelatedLoading || isProductLoading)
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
              <ProductSkeleton />
            ))}
          </div>
        </section>
      </>
    );

  return (
    <PageTransition>
      <div className="bg-base-bg dark:bg-dark-surface">
        <section className="custom-container section-padding">
          <Title heading={product?.category} subHeading={product?.title} />

          <ProductDetailsHero product={product} key={id} />
        </section>

        <Products
          heading={"You May Also Like"}
          subHeading={"Discover similar products handpicked just for you."}
          allProducts={relatedProducts}
        />

        <section className="custom-container section-padding">
          <Title
            heading={"Client Testimonials"}
            subHeading={"Real reviews from people who trusted us."}
          />
          <ProductReview product={product} />
        </section>

        <section className="custom-container section-padding">
          <StoreFeatures />
        </section>
      </div>
    </PageTransition>
  );
};

export default ProductDetails;
