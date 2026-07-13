import React, { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import Products from "../components/ui/Products";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import TitleSkeleton from "../components/ui/TitleSkeleton";
import ProductSkeleton from "../components/ui/ProductSkeleton";

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
  } = useQuery({ queryKey: ["allProducts"], queryFn: fetchProducts });
  console.log(allProducts);
  if (error) return <p>{error.message}</p>;
  if (isLoading)
    return (
      <section className="custom-container section-padding">
        <TitleSkeleton />
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
         gap-6  "
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductSkeleton />
          ))}
        </div>
      </section>
    );

  return (
    <Products
      heading={category}
      subHeading={`${allProducts.products.length} products Availabil`}
      allProducts={allProducts.products}
    />
  );
};

export default ProductsByCategory;
