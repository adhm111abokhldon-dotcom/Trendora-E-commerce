import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartProvider";
import { useWishList } from "../../../context/WishlistProvider";

const TopHeader = () => {
  const { totalPrice, cartItemesCount, cartItems, cartDispatch } = useCart();
  const { wishListState, dispatch, wishListItemsCount } = useWishList();
  return (
    <div
      className="flex justify-between items-center custom-container dark:bg-dark-bg
     h-12 md:h-15 border-b border-border-light dark:border-border-dark px-6 sm:px-15"
    >
      {/* Logo */}
      <div>
        <h2
          className="bg-linear-to-r from-slate-900 via-slate-700 to-amber-600 dark:from-white 
        dark:via-slate-700 dark:to-amber-600 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
        >
          Trendora
        </h2>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <button className="relative text-base-text dark:text-dark-text hover:text-accent-trendora transition duration-300">
          <Link to={"/cart"}>
            <FaShoppingCart className="text-xl md:text-3xl" />
            <span
              className="absolute -top-2 md:w-6 md:h-6 md:-right-3 md:-top-3 md:text-base 
            -right-2.5 w-4 h-4 bg-accent-trendora  text-base-text dark:text-dark-text text-[10px] 
            rounded-full flex items-center justify-center font-bold"
            >
              {cartItems.length}
            </span>
          </Link>
        </button>
        <button className="relative text-base-text dark:text-dark-text hover:text-accent-trendora transition duration-300">
          <Link className="w-full h-full" to={"wishList"}>
            {" "}
            <FaHeart className="text-xl md:text-3xl" />
          </Link>
          <span
            className="absolute -top-2 -right-2.5 w-4 h-4 md:w-6 md:h-6 md:-right-3 md:-top-3
           bg-accent-trendora  text-base-text dark:text-dark-text text-[10px] md:text-base
            rounded-full flex items-center justify-center font-bold"
          >
            {wishListItemsCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopHeader;
