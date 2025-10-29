"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartProvider";

export default function Navbar() {
  const { cartCountItems /*, cartCountQuantity */ } = useCart();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold text-gray-800">My Store</Link>

      <Link href="/cart" className="relative flex items-center gap-2">
        <ShoppingCart className="w-6 h-6 text-gray-700" />

        {/* Badge shows distinct item count by default */}
        {cartCountItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCountItems}
          </span>
        )}
      </Link>
    </nav>
  );
}
