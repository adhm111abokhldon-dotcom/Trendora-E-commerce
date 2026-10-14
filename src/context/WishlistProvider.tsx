import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  initialWhishListItems,
  WishListAction,
  wishListReducer,
} from "./wishlistReducer";
import { toast } from "sonner";
import { Product } from "@/types/ecommerce";
import { useI18n } from "@/i18n";

type WishListContextType = {
  handleClearWishlist: () => void;
  handleToggleWishlist: (item: Product) => void;
  wishListState: Product[];
  wishListDispatch: Dispatch<WishListAction>;
  wishListItemsCount: number;
  isInWishList: (id: string) => boolean;
  handleLogoutWishList: () => void;
};

const WishListContext = createContext<WishListContextType | null>(null);

const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishListState, wishListDispatch] = useReducer(
    wishListReducer,
    null,
    initialWhishListItems,
  );
  const { t } = useI18n();

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishListState));
  }, [wishListState]);
  const wishListItemsCount = wishListState.length;
  const isInWishList = (id: string) =>
    wishListState.some((item) => item._id === id);

  const handleToggleWishlist = (item: Product) => {
    if (isInWishList(item._id)) {
      toast.info(t("toast.removedFromWishlist"), {
        description: t("toast.removedFromWishlistDesc", { title: item.title }),
        position: "bottom-right",
      });
    } else {
      toast.success(t("toast.addedToWishlist"), {
        description: t("toast.addedToWishlistDesc", { title: item.title }),
        position: "bottom-right",
      });
    }
    wishListDispatch({ type: "TOGGLE_WISHLIST", payload: item });
  };
  const handleLogoutWishList = () => {
    wishListDispatch({ type: "CLEAR_WISHLIST" });
  };
  const handleClearWishlist = () => {
    if (wishListItemsCount === 0) return;
    toast.info(t("toast.clearWishlist"), {
      description: t("toast.clearWishlistDesc"),
      position: "bottom-right",
    });
    wishListDispatch({ type: "CLEAR_WISHLIST" });
  };

  return (
    <WishListContext.Provider
      value={{
        handleClearWishlist,
        handleToggleWishlist,
        wishListState,
        wishListDispatch,
        wishListItemsCount,
        isInWishList,
        handleLogoutWishList,
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
    throw new Error("useWishList must be used within a WishlistProvider");
  }
  return context;
};

