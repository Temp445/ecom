"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: async () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  // 🧠 Fetch Cart Count for Logged-in or Guest Users
  const fetchCartCount = async () => {
    try {
      if (user?._id) {
        // 🔹 Logged-in user cart count from API
        const res = await axios.get(`/api/cart?userId=${user._id}`);
        const items = res.data.cart?.items || [];
        setCartCount(items.length);
      } else {
        // 🔹 Guest cart count from localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        setCartCount(guestCart.length);
      }
    } catch (error) {
      console.error("❌ Error fetching cart count:", error);
      setCartCount(0);
    }
  };

  // 👀 Watch for user login/logout + load guest cart
  useEffect(() => {
    fetchCartCount();
  }, [user?._id]);

  // 🧩 Listen to localStorage updates (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "guestCart" && !user?._id) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        setCartCount(guestCart.length);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user?._id]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart: fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
