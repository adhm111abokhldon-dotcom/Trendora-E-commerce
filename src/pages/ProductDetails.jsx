import React, { useEffect, useState } from "react";
import ProductDetailsHero from "../components/productDetails/ProductDetailsHero";
import { useParams } from "react-router-dom";
import Title from "../components/ui/Title";
import ProductReview from "../components/productDetails/ProductReview";

import StoreFeatures from "../components/productDetails/StoreFeatures";
import ProductCard from "../components/ui/ProductCard";
import { FaRegHeart } from "react-icons/fa";
import { useWishList } from "../../context/WishlistProvider";
import { useCart } from "../../context/CartProvider";
import { FaHeart } from "react-icons/fa";
import Products from "../components/ui/Products";
import { sortByPrice } from "../../utils/sorting";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const { id } = useParams();
  const { wishListState, wishListDispatch, isInWishList } = useWishList();
  const {
    isInStock,
    isInCart,
    totalPrice,
    cartItemsCount,
    cartItems,
    cartDispatch,
  } = useCart();
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("error from ProductDetailsHero", err));
  }, [id]);

  useEffect(() => {
    if (!product.category) return;
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products));
  }, [product?.category]);
  if (!allProducts) return <p>Loading... jjjjjj</p>;
  return (
    <div className="bg-base-bg dark:bg-dark-surface">
      <section className="custom-container section-padding">
        <Title heading={product.category} subHeading={product.title} />
        <ProductDetailsHero
          product={product}
          setProduct={setProduct}
          key={id}
        />
      </section>
      <Products
        heading={"You May Also Like"}
        subHeading={"Discover similar products handpicked just for you."}
        allProducts={allProducts}
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
  );
};

export default ProductDetails;
