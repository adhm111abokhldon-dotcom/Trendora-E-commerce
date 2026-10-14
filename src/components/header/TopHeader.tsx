import { useCart } from "@/context/CartProvider";
import { useWishList } from "@/context/WishlistProvider";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthProvider";
import { useI18n } from "@/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TopHeader = () => {
  const { handleLogoutCart, cartItemsCount } = useCart();
  const { wishListItemsCount, handleLogoutWishList } = useWishList();
  const { authState, handleLogout } = useAuth();
  const { t } = useI18n();

  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    handleLogoutCart();
    handleLogoutWishList();
    handleLogout();
    navigate("/");
  };

  return (
    <div
      className="flex justify-between items-center custom-container dark:bg-dark-bg
      h-12 md:h-15 border-b border-border-light dark:border-border-dark
      px-6 sm:px-15"
    >
      {/* Logo */}
      <div>
        <h2
          className="bg-linear-to-r from-slate-900 via-slate-700 to-amber-600
          dark:from-white dark:via-slate-700 dark:to-amber-600
          bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl
          font-bold tracking-wide"
        >
          Trendora
        </h2>
      </div>
      {/* Icons */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Language */}
        <LanguageSwitcher />

        {/* Auth */}
        {authState.isAuthenticated ? (
          <AlertDialog>
            <AlertDialogTrigger>
              <button
                className="text-base-text flex-center text-xl md:text-3xl
                dark:text-dark-text hover:text-accent-trendora
                transition duration-300"
                aria-label={t("nav.account")}
                title={t("nav.account")}
              >
                <FaUserCircle />
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("auth.logoutTitle")}</AlertDialogTitle>

                <AlertDialogDescription>
                  {t("auth.logoutDesc")}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>{t("auth.cancel")}</AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleConfirmLogout}
                  className="bg-destructive hover:bg-destructive/90
                  text-destructive-foreground"
                >
                  {t("auth.logoutConfirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Link
            to="/login"
            className="text-base-text flex-center text-xl md:text-3xl
            dark:text-dark-text hover:text-accent-trendora
            transition duration-300"
            aria-label={t("nav.login")}
            title={t("nav.login")}
          >
            <CiLogin />
          </Link>
        )}
        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative text-base-text dark:text-dark-text
          hover:text-accent-trendora transition duration-300"
          aria-label={t("nav.cart")}
        >
          <FaShoppingCart className="text-xl md:text-3xl" />

          <span
            className="absolute -top-2 md:w-6 md:h-6 md:-right-3 md:-top-3
            md:text-base -right-2.5 w-4 h-4 bg-accent-trendora
            text-base-text dark:text-dark-text text-[10px]
            rounded-full flex items-center justify-center font-bold"
          >
            {cartItemsCount}
          </span>
        </Link>

        {/* Wishlist Icon */}
        <Link
          to="/wishList"
          className="relative text-base-text dark:text-dark-text
          hover:text-accent-trendora transition duration-300"
          aria-label={t("nav.wishlist")}
        >
          <FaHeart className="text-xl md:text-3xl" />

          <span
            className="absolute -top-2 -right-2.5 w-4 h-4
            md:w-6 md:h-6 md:-right-3 md:-top-3 bg-accent-trendora
            text-base-text dark:text-dark-text text-[10px]
            md:text-base rounded-full flex items-center justify-center
            font-bold"
          >
            {wishListItemsCount}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopHeader;
