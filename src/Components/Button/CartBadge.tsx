"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartProvider";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="text-xl font-bold">My Store</div>

      <Link href="/cart" className="relative flex items-center gap-1">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {cartCount > 0 && (
          <span className="text-sm text-gray-700 font-semibold">
            ({cartCount} {cartCount === 1 ? "item" : "items"})
          </span>
        )}
      </Link>
    </nav>
  );
}
