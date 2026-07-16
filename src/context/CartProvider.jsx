import { createContext, useReducer, useContext, useEffect } from "react";
import { cartReducer, initialCartState } from "./cartReducer";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    undefined,
    initialCartState,
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  const handleAddToCart = (item) => {
    toast.success("Added to Cart!", {
      description: `${item.title} has been added succsessfully.`,
      position: "bottom-right",
    });
    cartDispatch({ type: "ADD_TO_CART", payload: item });
  };
  const handdleDeleteFromCart = (item) => {
    toast.info("Removed from Cart!", {
      description: `${item.title} has been Removed from your cart`,
      position: "bottom-right",
      action: {
        label: "Undo",
        onClick: () => {
          cartDispatch({ type: "ADD_TO_CART", payload: item });
          toast.success("Restored to Cart");
        },
      },
    });

    cartDispatch({ type: "DELETE_FROM_CART", payload: item });
  };
  const handleLogoutCart = () => {
    cartDispatch({ type: "CLEAR_CART" });
  };
  const handleClearCart = () => {
    if (cartState.cartItems.length === 0) return;
    toast.info("Clear Cart", {
      description: `Cart has been Cleared succsessfully.`,
      position: "bottom-right",
    });
    cartDispatch({ type: "CLEAR_CART" });
  };

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
        cartDispatch,
        isInStock,
        isInCart,
        totalPrice,
        cartItemsCount,
        cartItems: cartState.cartItems,
        handleClearCart,
        handdleDeleteFromCart,
        handleAddToCart,
        handleLogoutCart,
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
