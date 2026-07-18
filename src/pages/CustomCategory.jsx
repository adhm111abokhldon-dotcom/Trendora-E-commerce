// const bestSellersIds = [2,4,6,8,10,12,14,16,18]
// const hotDropsIds = [1,3,5,7,9,11,13,15,17]

import Products from "@/components/ui/Products";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import TitleSkeleton from "@/components/ui/TitleSkeleton";
import { sorting } from "@/utils/sorting";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const displayedProducts = (products, categoryName) => {
  if (categoryName.toLowerCase() === "hotdrops") {
    return products.filter((product) => Number(product.rating) > 4.7);
  } else if (categoryName.toLowerCase() === "trendingnow") {
    return sorting("rating", products, "desc");
  } else if (categoryName.toLowerCase() === "newarrivals") {
    const copy = [...products]
      .sort((a, b) => new Date(b.meta.createdAt) - new Date(a.meta.createdAt))
      .slice(0, 8);
    return copy;
  } else {
    const sorted = sorting("rating", products, "asc");
    return sorted.slice(0, 12);
  }
};

const CustomCategory = () => {
  const { categoryName } = useParams();
  const fetchCategory = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    if (!res.ok) throw new Error("Faild to fetch custom category");
    return await res.json();
  };

  const {
    data: allProducts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["customCategory100"],
    queryFn: fetchCategory,
  });
  const allDisapled = allProducts?.products || [];
  const title = categoryName
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  if (isError) return <p>{error.message}</p>;

  if (isLoading)
    return (
      <>
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
      </>
    );

  return (
    <Products
      heading={title}
      subHeading={""}
      allProducts={displayedProducts(allDisapled, categoryName)}
    />
  );
};

export default CustomCategory;
