import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  Dispatch,
} from "react";
import { CartAction, cartReducer, initialCartState } from "./cartReducer";
import { toast } from "sonner";
import { CartItem, Product } from "@/types/ecommerce";

type CartContextType = {
  cartDispatch: Dispatch<CartAction>;
  isInStock: (product: Product) => "In Stock" | "Out of Stock";
  isInCart: (product: Product) => boolean;
  totalPrice: number;
  cartItemsCount: number;
  cartItems: CartItem[];
  handleClearCart: () => void;
  handleDeleteFromCart: (item: Product) => void;
  handleAddToCart: (product: Product) => void;
  handleLogoutCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    undefined,
    initialCartState,
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  const handleAddToCart = (item: Product) => {
    toast.success("Added to Cart!", {
      description: `${item.title} has been added succsessfully.`,
      position: "bottom-right",
    });
    cartDispatch({ type: "ADD_TO_CART", payload: item });
  };
  const handleDeleteFromCart = (item: Product) => {
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
      description: `Cart has been Cleared successfully.`,
      position: "bottom-right",
    });
    cartDispatch({ type: "CLEAR_CART" });
  };

  const cartItemsCount = cartState.cartItems.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0,
  );

  const totalPrice = cartState.cartItems.reduce(
    (total: number, item: CartItem) => total + item.quantity * item.price,
    0,
  );

  const isInStock = (product: Product) => product.availabilityStatus;
  const isInCart = (product: Product) =>
    cartState.cartItems.some((item: Product) => item.id === product.id);

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
        handleDeleteFromCart,
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
