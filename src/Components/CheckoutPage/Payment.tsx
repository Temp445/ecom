"use client";
import React, { useState } from "react";
import { CreditCard, Loader2, Wallet, Banknote, ShieldCheck, CheckCircle2 } from "lucide-react";
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

  const paymentOptions = [
    {
      id: "Online",
      title: "Pay Online",
      description: "UPI, Cards, Wallets & More",
      icon: Wallet,
      badge: "Instant",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      id: "COD",
      title: "Cash on Delivery",
      description: "Pay when you receive",
      icon: Banknote,
      badge: "Available",
      badgeColor: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <section className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="bg-emerald-500 p-2.5 rounded-lg">
          <CreditCard className="text-white w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl  text-gray-900">Payment Method</h2>
          <p className="text-sm text-gray-500">Choose how you'd like to pay</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {paymentOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = paymentMethod === option.id;

          return (
            <label
              key={option.id}
              className={`relative block p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm"
              }`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full p-1 shadow-lg">
                  <CheckCircle2 size={20} />
                </div>
              )}

              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={isSelected}
                onChange={() => setPaymentMethod(option.id as "COD" | "Online")}
                className="sr-only"
              />

              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    isSelected ? "bg-emerald-600" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isSelected ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={`font-bold text-base ${
                        isSelected ? "text-black" : "text-gray-900"
                      }`}
                    >
                      {option.title}
                    </h3>
                  
                  </div>
                  <p
                    className={`text-sm ${
                      isSelected ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    {option.description}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </div>

     

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-emerald-50 border border-emerald-200 rounded-lg py-3 px-4">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={placingOrder}
        className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all flex items-center justify-center gap-2 ${
          placingOrder
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-600 shadow-lg hover:shadow-xl"
        }`}
      >
        {placingOrder ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing Order...
          </>
        ) : (
          <>
            {paymentMethod === "Online" ? (
              <>
                <Wallet className="w-5 h-5" />
                Pay ₹{totalAmount.toFixed(2)} & Place Order
              </>
            ) : (
              <>
                <Banknote className="w-5 h-5" />
                Place Order (COD)
              </>
            )}
          </>
        )}
      </button>

   
    </section>
  );
}