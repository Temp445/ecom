"use client";

import React from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "./Checkout";

export default function OrderSummary({
  cartItems,
  totalAmount,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  cartItems: CartItem[];
  totalAmount: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900">
        <ShoppingCart className="text-emerald-600" /> Order Summary
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-3">
          {cartItems.map((it, idx) => {
            const id = it._id ?? idx.toString();
            const name =
              it.name ??
              (typeof it.productId === "object"
                ? it.productId.name
                : "Product");
            const img =
              it.image ??
              (typeof it.productId === "object"
                ? it.productId.thumbnail
                : "");
            const price =
              typeof it.price === "number"
                ? it.price
                : typeof it.productId === "object"
                ? it.productId.price ?? 0
                : 0;

            return (
              <div
                key={id}
                className="flex justify-between items-center border-b pb-2"
              >
                {/* Left side */}
                <div className="flex items-center gap-3">
                  {img ? (
                    <img
                      src={img}
                      alt={name}
                      className="w-12 h-12 rounded object-cover border"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded border" />
                  )}
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-gray-500">₹{price}</p>
                  </div>
                </div>

                {/* Right side: Quantity + Remove */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() => onDecrease(id)}
                      disabled={it.quantity <= 1}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 font-semibold text-gray-800">
                      {it.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onIncrease(id)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <p className="w-20 text-right font-semibold text-slate-900">
                    ₹{(price * it.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => onRemove(id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between font-semibold text-lg pt-3 border-t">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </section>
  );
}
