import React, { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import Products from "../components/ui/Products";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductsByCategory = () => {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products));
  }, [category]);
  if (!allProducts) return <p>Loading</p>;
  return (
    <Products
      heading={category}
      subHeading={`${allProducts.length} products Availabil`}
      allProducts={allProducts}
    />
  );
};

export default ProductsByCategory;
