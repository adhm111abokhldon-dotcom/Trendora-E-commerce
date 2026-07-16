import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
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
    <AnimatePresence mode="wait">
      <Toaster richColors position="bottom-right" />

      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <Header theme={theme} setTheme={setTheme} />
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
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
            </Routes>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </AnimatePresence>
  );
}

export default App;
