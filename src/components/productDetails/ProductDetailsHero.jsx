import React, { useContext, useEffect, useState } from "react";
import Title from "../ui/Title";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import getProductRating from "../../../utils/getProductRating";
import { useCart } from "../../../context/CartProvider";
import { FaCheckCircle } from "react-icons/fa";

const ProductDetailsHero = ({ product, setProduct }) => {
  const [currentImg, setCurrentImg] = useState("");
  const [isInStock, setISInStock] = useState(true);

  const { totalPrice, cartItemesCount, cartItems, cartDispatch } = useCart();

  const isInCart = cartItems.some((item) => item.id === product.id);
  useEffect(() => {
    if (product && product.images) {
      setCurrentImg(product.images[0]);
    }
  }, [product.images]);

  useEffect(() => {
    if (product && product.availabilityStatus) {
      product.availabilityStatus === "In Stock"
        ? setISInStock(true)
        : setISInStock(false);
    }
  }, [product.availabilityStatus]);

  if (!product || !product.images) return <div>Loading..</div>;

  const stars = getProductRating(Number(product.rating));

  return (
    <section className="flex flex-col md:items-center md:flex-row gap-4 ">
      <div className="w-full md:w-1/2 ">
        <div className="w-full mb-3 flex justify-center">
          <img
            className="w-45 h-40 object-cover "
            src={currentImg}
            alt={product.title}
          />
        </div>
        <div className=" flex ">
          {product.images.map((img, index) => (
            <div
              key={index}
              onClick={(e) => {
                setCurrentImg(img);
              }}
              className={`w-1/3 cursor-pointer ${currentImg === img ? "border border-accent" : ""} transition`}
            >
              <img
                className="w-full h-full object-cover"
                src={img}
                alt={product.title}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <h2 className="text-accent font-medium text-xl text-center mb-1 md:mb-2">
          {product.title}
        </h2>
        <p className="text-xs md:text-sm mb-1 md:mb-2 text-base-text dark:text-dark-text">
          {product.description}
        </p>
        <div className="text-base md:text-lg text-base-text dark:text-dark-text font-medium">
          <p>
            availability:{" "}
            <span className={`${isInStock ? "text-success" : "text-danger"}`}>
              {isInStock ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          <p>
            price: <span className="text-accent">${product.price}</span>
          </p>
          <p>
            Harry Up Only <span className="text-accent">{product.stock}</span>{" "}
            Left
          </p>
          <div className="flex gap-0.5 items-center">
            <span> rating: </span>
            {stars.map((star, index) => {
              if (star === "full") {
                return (
                  <span key={index}>
                    <FaStar className="fill-accent" />
                  </span>
                );
              } else if (star === "half") {
                return (
                  <span key={index}>
                    <FaStarHalfAlt className="fill-accent" />
                  </span>
                );
              } else {
                return (
                  <span key={index}>
                    <FaRegStar className="fill-accent" />
                  </span>
                );
              }
            })}
          </div>
        </div>

        <button
          onClick={() =>
            cartDispatch({ type: "ADD_TO_CART", payload: product })
          }
          disabled={!isInStock || isInCart}
          className={`${
            isInStock ? "" : "bg-gray-400 cursor-not-allowed!"
          } ${isInStock && !isInCart ? "bg-accent cursor-pointer active:scale-[0.97] hover:bg-accent-hover shadow-md" : "bg-success  cursor-not-allowed!"}  px-3 py-2 mt-5 text-base-text dark:text-dark-text group transition-all text-sm flex items-center gap-1
           rounded-full self-center `}
        >
          {!isInStock ? (
            "Out of Stock"
          ) : isInCart ? (
            <>Item in Cart {<FaCheckCircle />}</>
          ) : (
            <>
              Add to Cart{" "}
              <FaShoppingCart
                className={`${isInStock && !isInCart ? "group-hover:scale-[1.1]" : ""} transition`}
              />
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default ProductDetailsHero;
