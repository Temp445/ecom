"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { CreditCard, MapPin, ShoppingCart, User } from "lucide-react";
import CheckoutLogin from "./CheckoutLogin";
import CheckoutAddress from "./CheckoutAddress";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";

export type AddressType = {
  _id: string;
  Name: string;
  MobileNumber: string;
  PinCode?: string | number;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  AddressLine?: string;
};

export type CartItem = {
  _id?: string;
  productId?:
    | { _id: string; name?: string; price?: number; thumbnail?: string }
    | string;
  name?: string;
  image?: string;
  price?: number;
  quantity: number;
};

export default function Checkout() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Online">("COD");

  // Fetch data
  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const [addrRes, cartRes] = await Promise.all([
          axios.get(`/api/address?userId=${user._id}`),
          axios.get(`/api/cart?userId=${user._id}`),
        ]);

        const addr =
          addrRes.data?.addresses || addrRes.data?.data || addrRes.data || [];
        const items =
          cartRes.data?.cart?.items || cartRes.data?.items || cartRes.data || [];

        setAddresses(addr);
        setCartItems(items);
        if (addr.length && !selectedAddressId) setSelectedAddressId(addr[0]._id);
      } catch (e) {
        toast.error("Failed to load checkout data");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const totalAmount = useMemo(
    () =>
      cartItems.reduce((sum, it) => {
        const price =
          typeof it.price === "number"
            ? it.price
            : typeof it.productId === "object"
            ? it.productId.price ?? 0
            : 0;
        return sum + price * (it.quantity || 1);
      }, 0),
    [cartItems]
  );

  const goNext = () => {
    if (step === 1 && !user?._id) return toast.error("Please login to continue");
    if (step === 2 && !selectedAddressId)
      return toast.error("Please select a delivery address");
    if (step === 3 && !cartItems.length)
      return toast.error("Your cart is empty");
    setStep((s) => Math.min(4, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  if (loading) return <div className="text-center py-20">Loading checkout...</div>;

  const handleIncrease = (id: string) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const handleDecrease = (id: string) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

const handleRemove = (id: string) => {
  setCartItems((prev) => prev.filter((item) => item._id !== id));
};


  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="flex justify-between mb-8">
        {["Login", "Address", "Summary", "Payment"].map((label, i) => (
          <div key={label} className="flex flex-col items-center flex-1">
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold ${
                step === i + 1
                  ? "bg-emerald-600 text-white"
                  : step > i + 1
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {i + 1}
            </div>
            <p
              className={`mt-2 text-sm ${
                step === i + 1 ? "text-emerald-700" : "text-gray-500"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        {step === 1 && <CheckoutLogin user={user} />}
        {step === 2 && (
          <CheckoutAddress
            selectedAddressId={selectedAddressId}
            onSelect={setSelectedAddressId}
          />
        )}
        {step === 3 && <OrderSummary
  cartItems={cartItems}
  totalAmount={totalAmount}
  onIncrease={handleIncrease}
  onDecrease={handleDecrease}
  onRemove={handleRemove}
/>}

        {step === 4 && (
          <Payment
            user={user}
            cartItems={cartItems}
            selectedAddressId={selectedAddressId}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            totalAmount={totalAmount}
            router={router}
          />
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={goBack}
          disabled={step === 1}
          className="px-4 py-2 rounded border"
        >
          Back
        </button>
        {step < 4 && (
          <button
            onClick={goNext}
            className="px-4 py-2 rounded bg-emerald-600 text-white"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
