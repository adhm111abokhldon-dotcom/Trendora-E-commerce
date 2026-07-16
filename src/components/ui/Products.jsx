import Title from "./Title";
import ProductCard from "./ProductCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishList } from "@/context/WishlistProvider";
import { useCart } from "@/context/CartProvider";
import { useAuth } from "@/context/AuthProvider";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLocation, useNavigate } from "react-router-dom";

const Products = ({ allProducts, heading, subHeading }) => {
  const { handleToggleWishlist, isInWishList } = useWishList();
  const { isInStock, isInCart, handleAddToCart } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hanldePath = () => {
    navigate("/login", { state: { from: { pathname: location.pathname } } });
  };

  const { authState } = useAuth();

  return (
    <section className="custom-container section-padding bg-base-bg dark:bg-dark-surface">
      <Title heading={heading} subHeading={subHeading} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((item) => (
          <ProductCard key={item.id}>
            <ProductCard.Image
              path={`/products/${item.id}`}
              src={item.images[0]}
              alt={item.title}
              discount={item.discountPercentage}
              className="w-full h-35 md:h-40"
            >
              {authState.isAuthenticated ? (
                <button
                  className={`${isInWishList(item.id) ? "text-danger" : ""} absolute bg-base-bg top-1 
                right-2 sm:right-3 p-2  backdrop-blur-sm rounded-full  
              hover:scale-110 transition z-10 shadow-sm`}
                  onClick={() => handleToggleWishlist(item)}
                >
                  {isInWishList(item.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              ) : (
                <button
                  className={` absolute bg-base-bg top-1 
                right-2 sm:right-3 p-2  backdrop-blur-sm rounded-full  
              hover:scale-110 transition z-10 shadow-sm`}
                  onClick={() => setIsDialogOpen(true)}
                >
                  <FaRegHeart />
                </button>
              )}
            </ProductCard.Image>
            <ProductCard.body
              brand={item.brand || "Generic"}
              price={`$${item.price}`}
              title={item.title}
            >
              <button
                onClick={() => handleAddToCart(item)}
                disabled={!isInStock(item) || isInCart(item)}
                className={`${
                  !isInStock(item) || isInCart(item)
                    ? "bg-gray-400 cursor-not-allowed!"
                    : isInCart(item)
                      ? "bg-success cursor-not-allowed!"
                      : "bg-accent-trendora active:scale-[0.95] cursor-pointer hover:bg-accent-hover shadow-md"
                } text-white text-xs md:text-sm max-sm:self-stretch max-sm:mx-3  max-sm:mb-1 px-3 py-2 rounded-xl transition`}
              >
                {!isInStock(item)
                  ? "Out of Stock"
                  : isInCart(item)
                    ? "In Cart"
                    : "Add +"}
              </button>
            </ProductCard.body>
          </ProductCard>
        ))}
      </div>{" "}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Access Denied</AlertDialogTitle>
            <AlertDialogDescription>
              You Need to Logged in to View your Cart Would you like to log in
              now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancle
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                hanldePath();
                setIsDialogOpen(false);
              }}
            >
              Log In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Products;
