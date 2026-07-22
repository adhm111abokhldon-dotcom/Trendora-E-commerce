import {
  useEffect,
  useState,
  lazy,
  Suspense,
  Dispatch,
  SetStateAction,
} from "react";
import { AnimatePresence } from "framer-motion";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
// Provider
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/CartProvider";
import WishlistProvider from "./context/WishlistProvider";

import getInitialTheme from "./utils/getInitialTheme";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import ProgressLoader from "./components/ui/ProgressLoader";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductsByCategory = lazy(() => import("./pages/ProductsByCategory"));
const AllCategories = lazy(() => import("./pages/AllCategories"));
const WishList = lazy(() => import("./pages/WishList"));
const Login = lazy(() => import("./pages/Login"));
const CustomCategory = lazy(() => import("./pages/CustomCategory"));

const MainLayout = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Outlet />
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Toaster richColors position="bottom-right" />

      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />

            {/* Routes */}
            <AnimatePresence mode="wait">
              <Suspense fallback={<ProgressLoader />}>
                <Routes location={location} key={location.pathname}>
                  <Route
                    element={<MainLayout theme={theme} setTheme={setTheme} />}
                  >
                    <Route path="/" element={<Home />} />

                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route
                      path="/categories/:category"
                      element={<ProductsByCategory />}
                    />
                    <Route path="/categories" element={<AllCategories />} />
                    <Route
                      path="/customCategory/:categoryName"
                      element={<CustomCategory />}
                    />

                    {/* Protected Routes */}
                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/wishList"
                      element={
                        <ProtectedRoute>
                          <WishList />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                  <Route path="/login" element={<Login />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
