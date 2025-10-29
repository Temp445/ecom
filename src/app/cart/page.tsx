"use client";

import CartPage from "@/Components/Cart";
import { useAuth } from "@/context/AuthProvider"; // if you have auth context

export default function Page() {
  const { user } = useAuth();

//   if (!user) {
//     return <div className="text-center py-10 text-gray-500">Please login first.</div>;
//   }

  return <CartPage userId={user?._id} />;
}
