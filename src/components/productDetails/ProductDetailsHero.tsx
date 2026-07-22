import { useEffect, useMemo, useState } from "react";
import {
  FaCheckCircle,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

import { useCart } from "@/context/CartProvider";
import getProductRating from "@/utils/getProductRating";
import { Product } from "@/types/ecommerce";

const ProductDetailsHero = ({ product }: { product: Product }) => {
  const [currentImg, setCurrentImg] = useState("");
  const { handleAddToCart, cartItems } = useCart();

  const images = product?.images ?? [];
  const isInCart = cartItems.some((item) => item.id === product?.id);
  const isInStock = product?.availabilityStatus === "In Stock";
  const canAddToCart = isInStock && !isInCart;

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImg((prevImage) => {
        if (prevImage && images.includes(prevImage)) return prevImage;
        return images[0];
      });
    }
  }, [product?.id, images]);

  const stars = useMemo(
    () => getProductRating(Number(product?.rating ?? 0)),
    [product?.rating],
  );

  if (!product || images.length === 0) {
    return (
      <div className="py-8 text-center text-base-text dark:text-dark-text">
        Loading..
      </div>
    );
  }

  const activeImage = currentImg || images[0];

  const renderStars = () =>
    stars.map((star, index) => {
      if (star === "full") {
        return (
          <span key={`full-${index}`}>
            <FaStar className="fill-accent-trendora" />
          </span>
        );
      }

      if (star === "half") {
        return (
          <span key={`half-${index}`}>
            <FaStarHalfAlt className="fill-accent-trendora" />
          </span>
        );
      }

      return (
        <span key={`empty-${index}`}>
          <FaRegStar className="fill-accent-trendora" />
        </span>
      );
    });

  return (
    <section className="flex flex-col gap-4 md:items-center md:flex-row">
      <div className="w-full md:w-1/2">
        <div className="mb-3 flex w-full justify-center">
          <img
            className="h-40 w-45 object-cover"
            src={activeImage}
            alt={product.title}
            loading="lazy"
          />
        </div>

        <div className="flex">
          {images.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setCurrentImg(img)}
              className={`w-1/3 cursor-pointer transition ${
                activeImage === img ? "border border-accent-trendora" : ""
              }`}
              aria-label={`Show ${product.title} image ${index + 1}`}
            >
              <img
                className="h-full w-full object-cover"
                src={img}
                alt={`${product.title} ${index + 1}`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col md:w-1/2">
        <h2 className="mb-1 text-center text-xl font-medium text-accent-trendora md:mb-2">
          {product.title}
        </h2>

        <p className="mb-1 text-xs text-base-text dark:text-dark-text md:mb-2 md:text-sm">
          {product.description}
        </p>

        <div className="text-base font-medium text-base-text dark:text-dark-text md:text-lg">
          <p>
            availability:{" "}
            <span className={isInStock ? "text-success" : "text-danger"}>
              {isInStock ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          <p>
            price:{" "}
            <span className="text-accent-trendora">${product.price}</span>
          </p>
          <p>
            Harry Up Only{" "}
            <span className="text-accent-trendora">{product.stock}</span> Left
          </p>

          <div className="flex items-center gap-0.5">
            <span>rating:</span>
            {renderStars()}
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleAddToCart(product)}
          disabled={!canAddToCart}
          className={`mt-5 flex items-center gap-1 self-center rounded-full px-3 py-2 text-sm transition-all ${
            !isInStock
              ? "cursor-not-allowed bg-gray-400"
              : canAddToCart
                ? "cursor-pointer bg-accent-trendora shadow-md hover:bg-accent-hover active:scale-[0.97]"
                : "cursor-not-allowed bg-success"
          } text-base-text dark:text-dark-text`}
        >
          {!isInStock ? (
            "Out of Stock"
          ) : isInCart ? (
            <>
              Item in Cart <FaCheckCircle />
            </>
          ) : (
            <>
              Add to Cart{" "}
              <FaShoppingCart className="transition group-hover:scale-[1.1]" />
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default ProductDetailsHero;
