export const initialCartState = { cartItems: [] };

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      return {
        ...state,
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }
    case "DELETE_FROM_CART": {
      const id = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== id),
      };
    }
    case "DECRACE_QUANTITY": {
      const id = action.payload.id;
      const targetItem = state.cartItems.find((item) => item.id === id);
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
    case "INCRACE_QUANTITY": {
      const id = action.payload.id;
      const maxQty = action.payload.maxQty;
      const targetItem = state.cartItems.find((item) => item.id === id);
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
