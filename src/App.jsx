import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/header/Header";
import Cart from "./pages/Cart";
import { CartProvider } from "../context/CartProvider";
import { Toaster } from "sonner";

import ProductsByCategory from "./pages/ProductsByCategory";
import AllCategories from "./pages/AllCategories";
import WishlistProvider from "../context/WishlistProvider";
import WishList from "./pages/WishList";
import { sortByPrice } from "../utils/sorting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors />
        <CartProvider>
          <WishlistProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/categories/:category"
                element={<ProductsByCategory />}
              />
              <Route path="Categories" element={<AllCategories />} />
              <Route path="/wishList" element={<WishList />} />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
