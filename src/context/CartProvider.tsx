"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface CartContextType {
  cartCountItems: number;     // distinct items count (what most UIs show)
  cartCountQuantity: number;  // total quantity (sum of quantities)
  refreshCart: () => Promise<void>;
  forceSyncGuestCart: () => void; // helper to call after guest operations
}

const CartContext = createContext<CartContextType>({
  cartCountItems: 0,
  cartCountQuantity: 0,
  refreshCart: async () => {},
  forceSyncGuestCart: () => {},
});

export function CartProvider({
  children,
  userId,
}: {
  children: ReactNode;
  userId?: string;
}) {
  const [cartCountItems, setCartCountItems] = useState(0);
  const [cartCountQuantity, setCartCountQuantity] = useState(0);

  // helper to compute counts from guestCart array or server cart
  const computeCountsFromGuest = (guestCart: any[]) => {
    const items = guestCart.length;
    const quantity = guestCart.reduce((sum, it) => sum + (it.quantity || 0), 0);
    return { items, quantity };
  };

  const refreshCart = async () => {
    try {
      if (userId) {
        // Logged-in user -> fetch server cart
        const res = await axios.get(`/api/cart?userId=${userId}`);
        const itemsArr = res.data.cart?.items || [];
        const items = itemsArr.length;
        const quantity = itemsArr.reduce((sum: number, it: any) => sum + (it.quantity || 0), 0);
        setCartCountItems(items);
        setCartCountQuantity(quantity);

        // Optional: cache server counts for other tabs
        localStorage.setItem("serverCartCountItems", String(items));
        localStorage.setItem("serverCartCountQuantity", String(quantity));
      } else {
        // Guest -> read from localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const { items, quantity } = computeCountsFromGuest(guestCart);
        setCartCountItems(items);
        setCartCountQuantity(quantity);
      }
    } catch (err) {
      console.error("refreshCart error", err);
      setCartCountItems(0);
      setCartCountQuantity(0);
    }
  };

  // helper to force a cross-tab sync after local changes
  const forceSyncGuestCart = () => {
    // write a changing value so other tabs' storage event fires
    localStorage.setItem("cart-sync", String(Date.now()));
    // also refresh in this tab immediately
    refreshCart();
  };

  useEffect(() => {
    // initial load
    refreshCart();

    // storage listener (cross-tab)
    const onStorage = (e: StorageEvent) => {
      // if guest cart changed or cart-sync ping happened, refresh
      if (
        e.key === "guestCart" ||
        e.key === "cart-sync" ||
        e.key === "serverCartCountItems" ||
        e.key === "serverCartCountQuantity"
      ) {
        refreshCart();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, [userId]);

  return (
    <CartContext.Provider value={{ cartCountItems, cartCountQuantity, refreshCart, forceSyncGuestCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
