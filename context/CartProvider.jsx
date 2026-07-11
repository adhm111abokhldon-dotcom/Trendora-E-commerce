import { createContext, useReducer, useContext } from "react";
import { cartReducer, initialCartState } from "./cartReducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const cartItemsCount = cartState.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartState.cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const isInStock = (product) => product.availabilityStatus;
  const isInCart = (product) =>
    cartState.cartItems.some((item) => item.id === product.id);

  return (
    <CartContext.Provider
      value={{
        isInStock,
        isInCart,
        totalPrice,
        cartItemsCount,
        cartItems: cartState.cartItems,
        cartDispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartProvider;
