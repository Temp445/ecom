"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartProvider";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <div className="flex items-center justify-center gap-2 py-4">

      <Link href="/cart" className="relative flex items-center gap-1">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {cartCount > 0 && (
          <span className=" absolute  -top-2 left-3 text-xs text-gray-700 font-semibold">
            ({cartCount})
          </span>
        )}
      <div>Cart</div>
      </Link>

    </div>
  );
}
