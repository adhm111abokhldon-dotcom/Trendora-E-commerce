import { Product } from "@/types/ecommerce";

export type WishListAction =
  | { type: "TOGGLE_WISHLIST"; payload: Product }
  | { type: "DELETE_FROM_WISHLIST"; payload: string }
  | { type: "CLEAR_WISHLIST" };

export const initialWhishListItems = (): Product[] => {
  try {
    const saved = localStorage.getItem("wishList");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    // Guard against stale / malformed persisted data
    return parsed.filter(
      (item: Product) => item && typeof item._id === "string",
    );
  } catch {
    return [];
  }
};

export const wishListReducer = (
  state: Product[],
  action: WishListAction,
): Product[] => {
  switch (action.type) {
    case "TOGGLE_WISHLIST": {
      const product = action.payload;
      const isExist = state.some((item) => item._id === product._id);
      if (isExist) {
        return state.filter((item) => item._id !== product._id);
      }
      return [...state, product];
    }
    case "DELETE_FROM_WISHLIST": {
      const _id = action.payload;
      return state.filter((item) => item._id !== _id);
    }
    case "CLEAR_WISHLIST": {
      return [];
    }
    default:
      return state;
  }
};

