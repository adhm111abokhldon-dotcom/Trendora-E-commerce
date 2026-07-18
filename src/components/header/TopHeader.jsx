import { useCart } from "@/context/CartProvider";
import { useWishList } from "@/context/WishlistProvider";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthProvider";

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

import { useState } from "react";

const TopHeader = () => {
  const { cartItems, handleLogoutCart, cartItemsCount } = useCart();
  const { wishListItemsCount, handleLogoutWishList } = useWishList();
  const { authState, hanldleLogOut } = useAuth();

  const navigate = useNavigate();

  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [isWLDialogOpen, setIsWLDialogOpen] = useState(false);

  const handleConfirmLogout = () => {
    handleLogoutCart();
    handleLogoutWishList();
    hanldleLogOut();
    navigate("/");
  };

  const goToTargetPath = (targetPath) => {
    navigate("/login", {
      state: {
        from: {
          pathname: targetPath,
        },
      },
    });
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
      <div className="flex items-center gap-4">
        {/* Auth */}
        {authState.isAuthenticated ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="text-base-text flex-center text-xl md:text-3xl
                dark:text-dark-text hover:text-accent-trendora
                transition duration-300"
              >
                <FaUserCircle />
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  This will end your current session and you will need to log in
                  again to access your cart and favorites.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleConfirmLogout}
                  className="bg-destructive hover:bg-destructive/90
                  text-destructive-foreground"
                >
                  Log Out
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
          >
            <CiLogin />
          </Link>
        )}
        {/* Cart Icon */}
        <AlertDialog open={isCartDialogOpen} onOpenChange={setIsCartDialogOpen}>
          {authState.isAuthenticated ? (
            <Link
              to="/cart"
              className="relative text-base-text dark:text-dark-text
              hover:text-accent-trendora transition duration-300"
            >
              <FaShoppingCart className="text-xl md:text-3xl" />

              <span
                className="absolute -top-2 md:w-6 md:h-6 md:-right-3 md:-top-3
                md:text-base -right-2.5 w-4 h-4 bg-accent-trendora
                text-base-text dark:text-dark-text text-[10px]
                rounded-full flex items-center justify-center font-bold"
              >
                {cartItems.length}
              </span>
            </Link>
          ) : (
            <>
              <AlertDialogTrigger asChild>
                <button
                  className="relative flex-center text-base-text
                  dark:text-dark-text hover:text-accent-trendora
                  transition duration-300"
                >
                  <FaShoppingCart className="text-xl md:text-3xl" />

                  <span
                    className="absolute -top-2 md:w-6 md:h-6 md:-right-3
                    md:-top-3 md:text-base -right-2.5 w-4 h-4
                    bg-accent-trendora text-base-text dark:text-dark-text
                    text-[10px] rounded-full flex items-center justify-center
                    font-bold"
                  >
                    {cartItemsCount}
                  </span>
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Access Denied</AlertDialogTitle>

                  <AlertDialogDescription>
                    You need to Log in to View your Cart Would you like to log
                    in now?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsCartDialogOpen(false)}>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => {
                      goToTargetPath("/cart");
                      setIsCartDialogOpen(false);
                    }}
                  >
                    Log In
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </>
          )}
        </AlertDialog>

        {/* Wishlist Icon */}
        <AlertDialog open={isWLDialogOpen} onOpenChange={setIsWLDialogOpen}>
          {authState.isAuthenticated ? (
            <Link
              to="/wishList"
              className="relative text-base-text dark:text-dark-text
              hover:text-accent-trendora transition duration-300"
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
          ) : (
            <>
              <AlertDialogTrigger asChild>
                <button
                  className="relative flex-center text-base-text
                  dark:text-dark-text hover:text-accent-trendora
                  transition duration-300"
                >
                  <FaHeart className="text-xl md:text-3xl" />

                  <span
                    className="absolute -top-2 -right-2.5 w-4 h-4
                    md:w-6 md:h-6 md:-right-3 md:-top-3
                    bg-accent-trendora text-base-text dark:text-dark-text
                    text-[10px] md:text-base rounded-full flex items-center
                    justify-center font-bold"
                  >
                    {wishListItemsCount}
                  </span>
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Access Denied</AlertDialogTitle>

                  <AlertDialogDescription>
                    You Need to Logged in to View your WishList Would you like
                    to log in now?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsWLDialogOpen(false)}>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => {
                      goToTargetPath("/wishList");
                      setIsWLDialogOpen(false);
                    }}
                  >
                    Log In
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </>
          )}
        </AlertDialog>
      </div>
    </div>
  );
};

export default TopHeader;
