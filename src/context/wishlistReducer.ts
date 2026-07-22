import { Product } from "@/types/ecommerce";

export type WishListAction =
  | { type: "TOGGLE_WISHLIST"; payload: Product }
  | { type: "DELETE_FROM_WISHLIST"; payload: number }
  | { type: "CLEAR_WISHLIST" };

export const initialWhishListItems = (): Product[] => {
  try {
    const saved = localStorage.getItem("wishList");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const wishListReducer = (state: Product[], action: WishListAction) => {
  switch (action.type) {
    case "TOGGLE_WISHLIST": {
      const product = action.payload;
      const isExist = state.some((item) => item.id === product.id);
      if (isExist) {
        return state.filter((item) => item.id !== product.id);
      } else {
        return [...state, product];
      }
    }
    case "DELETE_FROM_WISHLIST": {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    }
    case "CLEAR_WISHLIST": {
      return [];
    }
    default:
      return state;
  }
};
