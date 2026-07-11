import React from "react";
import { useWishList } from "../../context/WishlistProvider";
import { FaHeart } from "react-icons/fa";

import { IoTrashOutline } from "react-icons/io5";
import EmptyState from "../components/ui/EmptyState";
import { useCart } from "../../context/CartProvider";
import Title from "../components/ui/Title";
import ProductCard from "../components/ui/ProductCard";

const WishList = () => {
  const { wishListState, wishListDispatch, wishListItemsCount, isInWishList } =
    useWishList();
  const { cartDispatch, isInCart, isInStock } = useCart();

  if (wishListItemsCount === 0)
    return (
      <EmptyState
        title={" Your WishList is Empty"}
        desc={
          " Looks like you haven't added any products to your wishList yet. Let's find something special!"
        }
        icon={<FaHeart size={50} />}
      />
    );
  return (
    <section className="custom-container section-padding bg-base-bg dark:bg-dark-surface">
      <Title
        heading={"My WishList"}
        subHeading={`You have ${wishListItemsCount} Products Saved`}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishListState.map((item) => (
          <ProductCard key={item.id}>
            <ProductCard.Image
              path={`/products/${item.id}`}
              src={item.images[0]}
              alt={item.title}
              discount={item.discountPercentage}
              className="w-full h-35 md:h-40"
            >
              <button
                className={`absolute top-1 right-2 z-20 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-gray-500 dark:text-gray-400
                 hover:text-danger dark:hover:text-danger hover:scale-110 shadow-sm active:scale-95 transition-all 
                `}
                onClick={() =>
                  wishListDispatch({ type: "TOGGLE_WISHLIST", payload: item })
                }
              >
                <IoTrashOutline />
              </button>
            </ProductCard.Image>
            <ProductCard.body
              brand={item.brand || "Generic"}
              price={`$${item.price}`}
              title={item.title}
            >
              <button
                onClick={() =>
                  cartDispatch({ type: "ADD_TO_CART", payload: item })
                }
                disabled={!isInStock(item) || isInCart(item)}
                className={`${
                  !isInStock(item) || isInCart(item)
                    ? "bg-gray-400 cursor-not-allowed!"
                    : isInCart(item)
                      ? "bg-success cursor-not-allowed!"
                      : "bg-accent active:scale-[0.95] cursor-pointer hover:bg-accent-hover shadow-md"
                } text-white text-xs md:text-sm px-3 py-2 rounded-xl transition`}
              >
                {!isInStock(item)
                  ? "Out of Stock"
                  : isInCart(item)
                    ? "In Cart"
                    : "Add +"}
              </button>
            </ProductCard.body>
          </ProductCard>
        ))}
      </div>
    </section>
  );
};

export default WishList;
