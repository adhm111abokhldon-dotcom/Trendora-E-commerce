import PageTransition from "@/components/PageTransition";
import ProductDetailsHero from "@/components/productDetails/ProductDetailsHero";
import ProductReview from "@/components/productDetails/ProductReview";
import StoreFeatures from "@/components/productDetails/StoreFeatures";
import ProductDetailsHeroSkeleton from "@/components/ui/ProductDetailsHeroSkeleton";
import Products from "@/components/ui/Products";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import Title from "@/components/ui/Title";
import TitleSkeleton from "@/components/ui/TitleSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct, getProductsByCategory } from "@/api/products";

const ProductDetails = () => {
  const { id } = useParams();
  const fetchProduct = () => getProduct(id);

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  const fetchProducts = async () => {
    if (!product?.category) {
      throw new Error("category is missing");
    }
    return getProductsByCategory(product.category);
  };

  const {
    data: products,
    isLoading: isRelatedLoading,
    error: relatedError,
  } = useQuery({
    queryKey: ["products", product?.category],
    queryFn: fetchProducts,
    enabled: !!product?.category,
  });
  if (productError) return <p>{productError.message}</p>;
  if (relatedError) return <p>{relatedError.message}</p>;
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
  const relatedProducts = products;
  return (
    <PageTransition>
      <div className="bg-base-bg dark:bg-dark-surface">
        <section className="custom-container section-padding">
          <Title heading={product.title} subHeading={product.description} />

          <ProductDetailsHero product={product} key={id} />
        </section>

        <Products
          heading={"You May Also Like"}
          subHeading={"Discover similar products handpicked just for you."}
          allProducts={relatedProducts}
        />
        <section className="custom-container section-padding">
          <StoreFeatures />
        </section>
        <section className="custom-container section-padding">
          <Title
            heading={"Client Testimonials"}
            subHeading={"Real reviews from people who trusted us."}
          />
          <ProductReview product={product} />
        </section>
      </div>
    </PageTransition>
  );
};

export default ProductDetails;
