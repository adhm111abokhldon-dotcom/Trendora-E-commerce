import { CartItem, Product } from "@/types/ecommerce";

type CartState = {
  cartItems: CartItem[];
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "DELETE_FROM_CART"; payload: { _id: string } }
  | { type: "DECREASE_QUANTITY"; payload: { _id: string } }
  | { type: "INCREASE_QUANTITY"; payload: { _id: string; maxQty: number } }
  | { type: "CLEAR_CART" };

const maxQtyFor = (item: CartItem) => {
  const stock = Number(item.stock);
  return Number.isFinite(stock) && stock > 0 ? stock : 1;
};

export const initialCartState = (): CartState => {
  try {
    const saved = localStorage.getItem("cart");
    if (!saved) return { cartItems: [] };
    const parsed = JSON.parse(saved);
    // Guard against stale / malformed persisted data
    if (!parsed || !Array.isArray(parsed.cartItems)) return { cartItems: [] };
    const cartItems = parsed.cartItems
      .filter(
        (item: CartItem) =>
          item && typeof item._id === "string" && Number(item.quantity) > 0,
      )
      .map((item: CartItem) => ({
        ...item,
        quantity: Math.max(1, Math.floor(Number(item.quantity))),
        stock: Number(item.stock) > 0 ? Number(item.stock) : 1,
      }));
    return { cartItems };
  } catch {
    return { cartItems: [] };
  }
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existing = state.cartItems.find(
        (item) => item._id === product._id,
      );
      if (existing) {
        // Duplicate: increase quantity but never exceed available stock
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === product._id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, maxQtyFor(item)),
                }
              : item,
          ),
        };
      }
      const stock = Number(product.stock);
      const quantity = Number.isFinite(stock) && stock > 0 ? 1 : 0;
      return {
        ...state,
        cartItems: [...state.cartItems, { ...product, quantity }],
      };
    }
    case "DELETE_FROM_CART": {
      const { _id } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== _id),
      };
    }
    case "DECREASE_QUANTITY": {
      const { _id } = action.payload;
      const target = state.cartItems.find((item) => item._id === _id);
      if (!target) return state;
      if (target.quantity <= 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item._id !== _id),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === _id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    }
    case "INCREASE_QUANTITY": {
      const { _id, maxQty } = action.payload;
      const target = state.cartItems.find((item) => item._id === _id);
      if (!target) return state;
      const limit = Number.isFinite(maxQty) && maxQty > 0 ? maxQty : 1;
      if (target.quantity >= limit) return state;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    }
    case "CLEAR_CART": {
      return { ...state, cartItems: [] };
    }
    default:
      return state;
  }
};

