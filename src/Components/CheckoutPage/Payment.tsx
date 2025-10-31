"use client";
import React, { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CartItem } from "./Checkout";

export default function Payment({
  user,
  cartItems,
  selectedAddressId,
  paymentMethod,
  setPaymentMethod,
  totalAmount,
  router,
}: {
  user: any;
  cartItems: CartItem[];
  selectedAddressId: string;
  paymentMethod: "COD" | "Online";
  setPaymentMethod: (m: "COD" | "Online") => void;
  totalAmount: number;
  router: ReturnType<typeof useRouter>;
}) {
  const [placingOrder, setPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user?._id) return toast.error("Login required");
    if (!selectedAddressId) return toast.error("Select an address");
    if (!cartItems.length) return toast.error("Cart is empty");

    setPlacingOrder(true);
    try {
      const payload = {
        userId: user._id,
        items: cartItems.map((it) => ({
          productId:
            typeof it.productId === "string"
              ? it.productId
              : it.productId?._id,
          quantity: Number(it.quantity),
          priceAtPurchase:
            typeof it.price === "number"
              ? it.price
              : typeof it.productId === "object"
              ? it.productId.price ?? 0
              : 0,
        })),
        shippingAddress: selectedAddressId,
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",
        orderStatus: "Processing",
      };

      const res = await axios.post("/api/orders", payload);
      if (res.status === 201 || res.data?.success) {
        toast.success("Order placed successfully");
        router.push("/orders/success");
      } else toast.error(res.data?.error || "Failed to place order");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Order creation failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CreditCard className="text-emerald-600" /> Payment
      </h2>

      <div className="flex gap-3">
        {["COD", "Online"].map((m) => (
          <label
            key={m}
            className={`p-3 border rounded cursor-pointer ${
              paymentMethod === m
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="pay"
              checked={paymentMethod === m}
              onChange={() => setPaymentMethod(m as "COD" | "Online")}
              className="mr-2"
            />
            {m === "COD" ? "Cash on Delivery" : "Pay Online"}
          </label>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handlePlaceOrder}
          disabled={placingOrder}
          className={`w-full py-3 rounded text-white font-semibold ${
            placingOrder ? "bg-gray-400" : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {placingOrder && <Loader2 className="inline mr-2 animate-spin" />}
          {paymentMethod === "Online" ? "Pay & Place Order" : "Place Order (COD)"}
        </button>
      </div>
    </section>
  );
}
