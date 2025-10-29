"use client";

import { useState } from "react";
import axios from "axios";
import { ShoppingCart, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartProvider";

interface AddToCartButtonProps {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  userId?: string;
  quantity?: number;
}

export default function AddToCartButton({
  product,
  userId,
  quantity = 1,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const { refreshCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      // 🛒 If user not logged in → store in localStorage
      if (!userId) {
        let guestCart =
          JSON.parse(localStorage.getItem("guestCart") || "[]") || [];

        // check if product already exists in local cart
        const existingItemIndex = guestCart.findIndex(
          (item: any) => item.product._id === product._id
        );

        if (existingItemIndex > -1) {
          toast.error("Already in cart!");
          return;
        }

        // new product → add to cart
        guestCart.push({ product, quantity });
        localStorage.setItem("guestCart", JSON.stringify(guestCart));

        toast.success("Added to cart!");
        await refreshCart(); // update cart count
        return;
      }

      // 👤 Logged-in user → API call
      const res = await axios.post("/api/cart", {
        userId,
        productId: product._id,
        quantity,
      });

      if (res.data.success) {
        if (res.data.message === "Already in cart") {
          toast.error("Already in cart!");
        } else {
          toast.success("Added to cart!");
        }
        await refreshCart();
      } else {
        toast.error(res.data.message || "Failed to add to cart.");
      }
    } catch (error: any) {
      console.error("Add to Cart Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <ShoppingCart className="w-4 h-4" />
      )}
      <span>{loading ? "Adding..." : "Add to Cart"}</span>
    </button>
  );
}
