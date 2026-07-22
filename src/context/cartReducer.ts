import { CartItem, Product } from "@/types/ecommerce";

type CartState = {
  cartItems: CartItem[];
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "DELETE_FROM_CART"; payload: { id: number; product?: Product } }
  | { type: "DECREACE_QUANTITY"; payload: { id: number } }
  | { type: "INCREACE_QUANTITY"; payload: { id: number; maxQty: number } }
  | { type: "CLEAR_CART" };

type CartReducerType = (state: CartState, action: CartAction) => CartState;

export const initialCartState = (): CartState => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { cartItems: [] };
  } catch {
    return { cartItems: [] };
  }
};

export const cartReducer: CartReducerType = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      return {
        ...state,
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }
    case "DELETE_FROM_CART": {
      const id = action.payload.id;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== id),
      };
    }
    case "DECREACE_QUANTITY": {
      const id = action.payload.id;
      const targetItem = state.cartItems.find((item) => item.id === id);
      if (!targetItem) return state;
      if (targetItem.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== id),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        };
      }
    }
    case "INCREACE_QUANTITY": {
      const id = action.payload.id;
      const maxQty = action.payload.maxQty;
      const targetItem = state.cartItems.find((item) => item.id === id);
      if (!targetItem) return state;
      if (targetItem.quantity === maxQty) {
        return state;
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
    }
    case "CLEAR_CART": {
      return {
        ...state,
        cartItems: [],
      };
    }
    default:
      return state;
  }
};
