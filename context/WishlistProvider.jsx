import { createContext, useContext, useReducer } from "react";
import { initialWhishListItems, wishListReducer } from "./wishlistReducer";

const WishListContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishListState, wishListDispatch] = useReducer(
    wishListReducer,
    initialWhishListItems,
  );
  const wishListItemsCount = wishListState.length;
  const isInWishList = (id) => wishListState.some((item) => item.id === id);
  return (
    <WishListContext.Provider
      value={{
        wishListState,
        wishListDispatch,
        wishListItemsCount,
        isInWishList,
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
