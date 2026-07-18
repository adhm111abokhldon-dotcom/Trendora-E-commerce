import { lazy, Suspense } from "react";

import { AnimatePresence } from "framer-motion";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import CartProvider from "./context/CartProvider";
import WishlistProvider from "./context/WishlistProvider";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Header from "./components/header/Header";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProductsByCategory from "./pages/ProductsByCategory";
import AllCategories from "./pages/AllCategories";
import WishList from "./pages/WishList";
import { useEffect, useState } from "react";
import getInitialTheme from "./utils/getInitialTheme";
import Login from "./pages/Login";
import AuthProvider from "./context/AuthProvider";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomCategory from "./pages/CustomCategory";

const MainLayout = ({ theme, setTheme }) => {
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Outlet />
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
            </AnimatePresence>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
