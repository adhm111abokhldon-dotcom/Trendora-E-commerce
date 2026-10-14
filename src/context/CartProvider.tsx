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
import { useI18n } from "@/i18n";

type CartContextType = {
  cartDispatch: Dispatch<CartAction>;
  isInStock: (product: Product) => boolean;
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
  const { t } = useI18n();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  const handleAddToCart = (item: Product) => {
    const stock = Number(item.stock);
    if (!Number.isFinite(stock) || stock <= 0) return;
    toast.success(t("toast.addedToCart"), {
      description: t("toast.addedToCartDesc", { title: item.title }),
      position: "bottom-right",
    });
    cartDispatch({ type: "ADD_TO_CART", payload: item });
  };
  const handleDeleteFromCart = (item: Product) => {
    toast.info(t("toast.removedFromCart"), {
      description: t("toast.removedFromCartDesc", { title: item.title }),
      position: "bottom-right",
      action: {
        label: t("toast.undo"),
        onClick: () => {
          cartDispatch({ type: "ADD_TO_CART", payload: item });
          toast.success(t("toast.restored"));
        },
      },
    });

    cartDispatch({ type: "DELETE_FROM_CART", payload: { _id: item._id } });
  };
  const handleLogoutCart = () => {
    cartDispatch({ type: "CLEAR_CART" });
  };
  const handleClearCart = () => {
    if (cartState.cartItems.length === 0) return;
    toast.info(t("toast.clearCart"), {
      description: t("toast.clearCartDesc"),
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

  const isInStock = (product: Product) => Number(product.stock) > 0;
  const isInCart = (product: Product) =>
    cartState.cartItems.some((item: CartItem) => item._id === product._id);

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

