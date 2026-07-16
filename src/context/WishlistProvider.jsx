import { createContext, useContext, useEffect, useReducer } from "react";
import { initialWhishListItems, wishListReducer } from "./wishlistReducer";
import { toast } from "sonner";

const WishListContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishListState, wishListDispatch] = useReducer(
    wishListReducer,
    undefined,
    initialWhishListItems,
  );

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishListState));
  }, [wishListState]);
  const wishListItemsCount = wishListState.length;
  const isInWishList = (id) => wishListState.some((item) => item.id === id);

  const handleToggleWishlist = (item) => {
    if (isInWishList(item.id)) {
      toast.info("Removed from Wishlist!", {
        description: `${item.title} has been Removed from your Wishlist`,
        position: "bottom-right",
      });
      wishListDispatch({ type: "TOGGLE_WISHLIST", payload: item });
    } else {
      toast.success("Added to Wishlist!", {
        description: `${item.title} has been added succsessfully.`,
        position: "bottom-right",
      });
      wishListDispatch({ type: "TOGGLE_WISHLIST", payload: item });
    }
  };
  const handleLogoutWishList = () => {
    wishListDispatch({ type: "CLEAR_WISHLIST" });
  };
  const handleClearWishlist = () => {
    if (wishListItemsCount === 0) return;
    toast.info("Clear Wishlist", {
      description: `Wishlist has been Cleared succsessfully.`,
      position: "bottom-right",
    });
    wishListDispatch({ type: "CLEAR_WISHLIST" });
  };

  return (
    <WishListContext.Provider
      value={{
        handleClearWishlist,
        handleToggleWishlist,
        wishListState,
        wishListDispatch,
        wishListItemsCount,
        isInWishList,
        handleLogoutWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export default WishlistProvider;

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("useWishList must be used within a wishlistProvider");
  }
  return context;
};
