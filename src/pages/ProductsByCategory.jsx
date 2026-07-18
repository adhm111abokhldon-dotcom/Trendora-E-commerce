import PageTransition from "@/components/PageTransition";
import Products from "@/components/ui/Products";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import TitleSkeleton from "@/components/ui/TitleSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProductsByCategory = () => {
  const { category } = useParams();

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`,
    );
    if (!res.ok) throw new Error("Faild to fetch Products");
    return res.json();
  };
  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery({ queryKey: ["allProducts", category], queryFn: fetchProducts });
  console.log(allProducts);
  if (error) return <p>{error.message}</p>;
  if (isLoading)
    return (
      <>
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
      </>
    );

  return (
    <PageTransition>
      <Products
        heading={category.replaceAll("-", " ")}
        subHeading={`${allProducts.products.length} products Available`}
        allProducts={allProducts.products}
      />
    </PageTransition>
  );
};

export default ProductsByCategory;
