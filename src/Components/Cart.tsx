"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Trash2, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartProvider";

interface CartPageProps {
  userId?: string;
}

export default function Cart({ userId }: CartPageProps) {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { refreshCart } = useCart();

  // 🧠 Fetch Cart (DB or LocalStorage)
  const fetchCart = async () => {
    try {
      setLoading(true);

      if (userId) {
        // Logged-in user cart
        const res = await axios.get(`/api/cart?userId=${userId}`);
        setCart(res.data.cart);
      } else {
        // Guest cart from localStorage
        const localCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const fakeCart = {
          items: localCart.map((item: any) => ({
            _id: item.product._id,
            productId: item.product,
            quantity: item.quantity,
          })),
        };
        setCart(fakeCart);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  // 🧩 Update Quantity (user or guest) — Instant UI Update
  const handleQuantityUpdate = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;

    try {
      setUpdatingId(itemId);

      // 🔹 Instant Local Update
      setCart((prev: any) => {
        const updatedItems = prev.items.map((item: any) =>
          (userId ? item._id : item.productId._id) === itemId
            ? { ...item, quantity: newQty }
            : item
        );
        return { ...prev, items: updatedItems };
      });

      if (userId) {
        // Logged-in user → API update
        const res = await axios.put(`/api/cart/${itemId}`, { quantity: newQty });
        if (res.data.success) {
          await refreshCart();
          toast.success("Quantity updated");
        } else {
          toast.error(res.data.message || "Failed to update quantity");
        }
      } else {
        // Guest → update localStorage
        let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const index = guestCart.findIndex(
          (item: any) => item.product._id === itemId
        );
        if (index > -1) {
          guestCart[index].quantity = newQty;
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
          toast.success("Quantity updated");
        }
      }
    } catch {
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  // 🗑 Delete Item (user or guest)
  const handleDelete = async (itemId: string) => {
    if (!confirm("Remove this item from cart?")) return;

    try {
      setUpdatingId(itemId);

      if (userId) {
        // Logged-in user → delete via API
        const res = await axios.delete(`/api/cart/${itemId}`);
        if (res.data.success) {
          setCart((prev: any) => ({
            ...prev,
            items: prev.items.filter((item: any) => item._id !== itemId),
          }));
          await refreshCart();
          toast.success("Item removed");
        } else {
          toast.error(res.data.message || "Failed to remove item");
        }
      } else {
        // Guest → remove locally
        let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        guestCart = guestCart.filter(
          (item: any) => item.product._id !== itemId
        );
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        setCart((prev: any) => ({
          ...prev,
          items: prev.items.filter(
            (item: any) => item.productId._id !== itemId
          ),
        }));
        await refreshCart();
        toast.success("Item removed");
      }
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCheckout = () => {
    if (!userId) {
      toast.error("Please log in to continue checkout.");
      return;
    }
    toast.success("Redirecting to payment...");
    // router.push("/checkout");
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );

  if (!cart?.items?.length)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Your cart is empty 🛒
      </div>
    );

  const totalAmount = cart.items.reduce(
    (sum: number, item: any) =>
      sum +
      (item.productId.discountPrice || item.productId.price || 0) *
        item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          🛒 Your Cart
          <span className="text-gray-500 text-lg">
            ({cart.items.length} {cart.items.length === 1 ? "item" : "items"})
          </span>
        </h1>

        {cart.items.map((item: any) => {
          const stock = item.productId.stock || 999;
          const inStock = stock >= item.quantity;
          const isUpdating = updatingId === (userId ? item._id : item.productId._id);

          return (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 gap-4"
            >
              {/* Product Info */}
              <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                <img
                  src={
                    item.productId.thumbnail ||
                    item.productId.image ||
                    item.productId.images?.[0] ||
                    "/placeholder.png"
                  }
                  alt={item.productId.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {item.productId.name || "Unnamed Product"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    ₹{item.productId.discountPrice || item.productId.price}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      inStock ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() =>
                      handleQuantityUpdate(
                        userId ? item._id : item.productId._id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1 || isUpdating}
                    className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityUpdate(
                        userId ? item._id : item.productId._id,
                        item.quantity + 1
                      )
                    }
                    disabled={isUpdating || item.quantity >= stock}
                    className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <span className="font-semibold text-gray-800 whitespace-nowrap">
                  ₹
                  {(item.productId.discountPrice || item.productId.price) *
                    item.quantity}
                </span>

                <button
                  onClick={() =>
                    handleDelete(userId ? item._id : item.productId._id)
                  }
                  disabled={isUpdating}
                  className="text-red-500 hover:text-red-700"
                > 
         <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🧾 Summary */}
      <div className="bg-white border rounded-xl shadow-sm p-6 h-fit sticky top-24">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Order Summary
        </h2>
        <div className="flex justify-between mb-2 text-gray-700">
          <span>Subtotal</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2 text-gray-700">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
